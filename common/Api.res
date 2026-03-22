@scope("process.env") @val external aushaToken: string = "AUSHA_TOKEN" //only accessible server-side
let baseUrl = "https://developers.ausha.co"
let showId = "32899"

let get = url =>
  Fetch.fetch(
    url,
    ~options=Fetch.options(
      ~headers={
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${aushaToken}`,
      },
      (),
    ),
    (),
  )

module IsoDate = {
  type t = Date.t

  let schema = S.string->S.transform(s => {
    parser: value => {
      let date = Date.fromString(value)
      if Date.getTime(date)->Float.isNaN {
        s.fail(`Invalid date ${value}`)
      } else {
        date
      }
    },
    serializer: Date.toISOString,
  })

  @send
  external toDayAndMonthShortString: (
    t,
    @as(json`undefined`) _,
    @as(json`{month: 'short', day: 'numeric'}`) _,
  ) => string = "toLocaleDateString"

  @send
  external toMonthAndYearShortString: (
    t,
    @as(json`undefined`) _,
    @as(json`{month: 'short', year: 'numeric'}`) _,
  ) => string = "toLocaleDateString"
}

module Common = {
  @schema
  type pagination = {
    total: int,
    count: int,
    per_page: int,
    current_page: int,
    total_pages: int,
  }

  @schema
  type meta = {pagination: pagination}

  @schema
  type links = {
    self: string,
    first: string,
    prev: @s.nullable option<string>,
    next: @s.nullable option<string>,
    last: string,
  }

  type data<'a> = {
    data: array<'a>,
    meta: meta,
  }

  let dataSchema = paramSchema =>
    S.schema(s => {
      data: s.matches(S.array(paramSchema)),
      meta: s.matches(metaSchema),
    })

  type simpleData<'a> = {data: 'a}
  let simpleDataSchema = paramSchema =>
    S.schema(s => {
      data: s.matches(paramSchema),
    })

  type arrayData<'a> = simpleData<array<'a>>
  let arrayDataSchema = paramSchema =>
    S.schema(s => {
      data: s.matches(S.array(paramSchema)),
    })
}

module Link = {
  @schema
  type t = {
    key: string,
    url: string,
  }
}

module Podcast = {
  module Type = {
    @schema
    type t =
      | @as("full") Full
      | @as("bonus") Bonus
      | @as("trailer") Trailer
  }

  module Privacy = {
    @schema
    type t =
      | @as("public") Public
      | @as("private") Private
      | @as("unlisted") Unlisted
  }

  module State = {
    @schema
    type t =
      | @as("draft") Draft
      | @as("blocked") Blocked
      | @as("active") Active
      | @as("scheduled") Scheduled
  }

  module AutoSharing = {
    @schema
    type t =
      | @as("facebook") Facebook
      | @as("twitter") Twitter
      | @as("newsletter") Newsletter
  }

  @schema
  type tag = {
    id: int,
    slug: string,
    name: string,
  }

  @schema
  type file = {
    format: string,
    key: string,
    mime_type: string,
    duration: float,
  }

  type tags = Common.arrayData<tag>
  let tagsSchema = Common.arrayDataSchema(tagSchema)

  type files = Common.arrayData<file>
  let filesSchema = Common.arrayDataSchema(fileSchema)

  @schema
  type t = {
    id: int,
    show_id: int,
    @as("type")
    type_: Type.t,
    season_id: @s.nullable option<int>,
    name: string,
    public_id: string,
    guid: string,
    slug: string,
    description: @s.nullable option<string>,
    html_description: @s.nullable option<string>,
    privacy: Privacy.t,
    state: State.t,
    is_explicit: bool,
    can_download: bool,
    duration: float,
    image_url: @s.nullable option<string>,
    audio_url: string,
    site_url: @s.nullable option<string>,
    smartlink_url: string,
    waveform_url: string,
    downloads_count: int,
    published_at: IsoDate.t,
    created_at: IsoDate.t,
    updated_at: IsoDate.t,
    tags: tags,
    files: files,
  }

  module SingleByPublicId = {
    type t = Common.simpleData<t>
    let schema = Common.simpleDataSchema(schema)
    let get = async (public_id: string) => {
      let url = `${baseUrl}/v1/podcasts/public_id/${public_id}`
      let response = await get(url)
      await response->Fetch.json
    }
  }
}

module Podcasts = {
  type t = Common.data<Podcast.t>
  let schema = Common.dataSchema(Podcast.schema)

  let get = async (
    ~public=false,
    ~private_=false,
    ~unlisted=false,
    ~active=false,
    ~draft=false,
    ~scheduled=false,
    (),
  ) => {
    let statuses = []
    if public {
      statuses->Array.push("public")->ignore
    }
    if private_ {
      statuses->Array.push("private")->ignore
    }
    if unlisted {
      statuses->Array.push("unlisted")->ignore
    }
    if active {
      statuses->Array.push("active")->ignore
    }
    if draft {
      statuses->Array.push("draft")->ignore
    }
    if scheduled {
      statuses->Array.push("scheduled")->ignore
    }
    let queryString = switch statuses {
    | [] => ""
    | statuses => "?" ++ statuses->Array.map(status => `status[]=${status}`)->Array.join("&")
    }
    let url = `${baseUrl}/v1/shows/${showId}/podcasts${queryString}`
    let response = await get(url)
    await response->Fetch.json
  }
}

module Show = {
  type listeningLinks = Common.arrayData<Link.t>
  let listeningLinksSchema = Common.arrayDataSchema(Link.schema)

  @schema
  type t = {
    description: string,
    html_description: string,
    image_url: string,
    listening_links: listeningLinks,
  }
}

module Shows = {
  module SingleById = {
    type t = Common.simpleData<Show.t>
    let schema = Common.simpleDataSchema(Show.schema)

    let get = async () => {
      let url = `${baseUrl}/v1/shows/${showId}`
      let response = await get(url)
      await response->Fetch.json
    }
  }
}

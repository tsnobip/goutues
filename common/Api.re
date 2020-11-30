open Belt;

[@scope "process.env"] [@val] external aushaToken: string = "AUSHA_TOKEN"; //only accessible server-side
let baseUrl = "https://developers.ausha.co";
let showId = "32899";

let get = url =>
  Fetch.fetch(
    url,
    ~options=
      Fetch.options(
        ~headers={
          "accept": "application/json",
          "content-type": "application/json",
          "Authorization": {j|Bearer $aushaToken|j},
        },
        (),
      ),
    (),
  );

module IsoDate = {
  type t = Js.Date.t;

  let t_decode = (json: Js.Json.t) =>
    json
    ->Decco.stringFromJson
    ->Result.flatMap(v => {
        let date = Js.Date.fromString(v);
        if (date->Js.Date.getTime->Js.Float.isNaN) {
          Decco.error("Not a valid date", json);
        } else {
          Result.Ok(date);
        };
      });

  let t_encode = date => date->Js.Date.toISOString->Decco.stringToJson;

  let codec = (t_encode, t_decode);

  [@bs.send]
  external toDayAndMonthShortString:
    (
      t,
      [@bs.as {json|undefined|json}] _,
      [@bs.as {json|{month: 'short', day: 'numeric'}|json}] _
    ) =>
    string =
    "toLocaleDateString";

  [@bs.send]
  external toMonthAndYearShortString:
    (
      t,
      [@bs.as {json|undefined|json}] _,
      [@bs.as {json|{month: 'short', year: 'numeric'}|json}] _
    ) =>
    string =
    "toLocaleDateString";
};

module Common = {
  [@decco]
  type pagination = {
    total: int,
    count: int,
    per_page: int,
    current_page: int,
    total_pages: int,
  };

  [@decco]
  type meta = {pagination};

  [@decco]
  type links = {
    self: string,
    first: string,
    prev: option(string),
    next: option(string),
    last: string,
  };

  [@decco]
  type data('a) = {
    data: array('a),
    meta,
    links,
  };

  [@decco]
  type simpleData('a) = {data: 'a};

  [@decco]
  type arrayData('a) = simpleData(array('a));
};

module Podcast = {
  module Type = {
    type t =
      | Full
      | Bonus
      | Trailer;

    let t_decode = (json: Js.Json.t) =>
      json
      ->Decco.stringFromJson
      ->Result.flatMap(
          fun
          | "full" => Result.Ok(Full)
          | "bonus" => Result.Ok(Bonus)
          | "trailer" => Result.Ok(Trailer)
          | _ => Decco.error("not a valid podcast type", json),
        );

    let t_encode = t => {
      let string =
        switch (t) {
        | Full => "full"
        | Bonus => "bonus"
        | Trailer => "trailer"
        };
      string->Decco.stringToJson;
    };

    let codec = (t_encode, t_decode);
  };

  module Privacy = {
    type t =
      | Public
      | Private
      | Unlisted;

    let t_decode = (json: Js.Json.t) =>
      json
      ->Decco.stringFromJson
      ->Result.flatMap(
          fun
          | "public" => Result.Ok(Public)
          | "private" => Result.Ok(Private)
          | "unlisted" => Result.Ok(Unlisted)
          | _ => Decco.error("not a valid podcast privacy", json),
        );

    let t_encode = t => {
      let string =
        switch (t) {
        | Public => "public"
        | Private => "private"
        | Unlisted => "unlisted"
        };
      string->Decco.stringToJson;
    };

    let codec = (t_encode, t_decode);
  };

  module State = {
    type t =
      | Draft
      | Blocked
      | Active
      | Scheduled;

    let t_decode = (json: Js.Json.t) =>
      json
      ->Decco.stringFromJson
      ->Result.flatMap(
          fun
          | "draft" => Result.Ok(Draft)
          | "blocked" => Result.Ok(Blocked)
          | "active" => Result.Ok(Active)
          | "scheduled" => Result.Ok(Scheduled)
          | _ => Decco.error("not a valid podcast state", json),
        );

    let toString =
      fun
      | Draft => "draft"
      | Blocked => "blocked"
      | Active => "active"
      | Scheduled => "scheduled";

    let t_encode = t => t->toString->Decco.stringToJson;

    let codec = (t_encode, t_decode);
  };

  module AutoSharing = {
    type t =
      | Facebook
      | Twitter
      | Newsletter;

    let t_decode = (json: Js.Json.t) =>
      json
      ->Decco.stringFromJson
      ->Result.flatMap(
          fun
          | "facebook" => Result.Ok(Facebook)
          | "twitter" => Result.Ok(Twitter)
          | "newsletter" => Result.Ok(Newsletter)
          | _ => Decco.error("not a valid autosharing policy", json),
        );

    let t_encode = t => {
      let string =
        switch (t) {
        | Facebook => "facebook"
        | Twitter => "twitter"
        | Newsletter => "newsletter"
        };
      string->Decco.stringToJson;
    };

    let codec = (t_encode, t_decode);
  };

  [@decco]
  type tag = {
    id: int,
    slug: string,
    name: string,
  };

  [@decco]
  type file = {
    format: string,
    key: string,
    mime_type: string,
    duration: float,
  };

  [@decco]
  type t = {
    id: int,
    show_id: int,
    [@decco.key "type"]
    type_: Type.t,
    season_id: option(int),
    name: string,
    public_id: string,
    guid: string,
    slug: string,
    description: option(string),
    html_description: option(string),
    privacy: Privacy.t,
    state: State.t,
    is_explicit: bool,
    can_download: bool,
    duration: float,
    image_url: option(string),
    audio_url: string,
    site_url: option(string),
    smartlink_url: string,
    waveform_url: string,
    downloads_count: int,
    auto_sharing: array(AutoSharing.t),
    published_at: IsoDate.t,
    created_at: IsoDate.t,
    updated_at: IsoDate.t,
    tags: Common.arrayData(tag),
    files: Common.arrayData(file),
  };
};

module Podcasts = {
  [@decco]
  type t = Common.data(Podcast.t);

  let get =
      (
        ~public=false,
        ~private=false,
        ~unlisted=false,
        ~active=false,
        ~draft=false,
        ~scheduled=false,
        (),
      )
      : Promise.t(Js.Json.t) => {
    let statuses = [||];
    if (public) {
      statuses->Js.Array2.push("public")->ignore;
    };
    if (private) {
      statuses->Js.Array2.push("private")->ignore;
    };
    if (unlisted) {
      statuses->Js.Array2.push("unlisted")->ignore;
    };
    if (active) {
      statuses->Js.Array2.push("active")->ignore;
    };
    if (draft) {
      statuses->Js.Array2.push("draft")->ignore;
    };
    if (scheduled) {
      statuses->Js.Array2.push("scheduled")->ignore;
    };
    let queryString =
      switch (statuses) {
      | [||] => ""
      | statuses =>
        "?"
        ++ statuses
           ->Array.map(status => {j|status[]=$status|j})
           ->Array.joinWith("&", s => s)
      };
    let url = {j|$baseUrl/v1/shows/$showId/podcasts$queryString|j};
    get(url)->Promise.flatMap(Fetch.json);
  };
};

module Show = {
  [@decco]
  type t = {
    description: string,
    html_description: string,
  };
};

module Shows = {
  module SingleById = {
    [@decco]
    type t = Common.simpleData(Show.t);

    let get = (): Promise.t(Js.Json.t) => {
      let url = {j|$baseUrl/v1/shows/$showId|j};
      get(url)->Promise.flatMap(Fetch.json);
    };
  };
};

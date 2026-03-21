open Api.Common
open Utils

type props = {episod: JSON.t}

module Player = {
  @react.component
  let make = (~public_id) => {
    let code = `<iframe frameborder="0" loading="lazy" id="ausha-dwpf" height="220" style="border: none; width:100%; height:220px" src="https://player.ausha.co/index.html?showId=od2PjTvjJpwV&color=%239b4d1c&podcastId=${public_id}&v=3&playerId=ausha-dwpf"></iframe><script src="https://player.ausha.co/ausha-player.js"></script>
`
    <div className="mt-5" dangerouslySetInnerHTML={"__html": code} />
  }
}

let default = ({episod}: props) =>
  switch episod->S.parseJsonOrThrow(Api.Podcast.SingleByPublicId.schema) {
  | {data: {html_description, description, name, image_url, public_id}} =>
    let title = name
    <div>
      <Next.Head>
        <title> {s(title)} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {switch description {
        | Some(description) =>
          <>
            <meta name="description" content=description />
            <meta property="og:description" content=description key="ogdesc" />
          </>
        | None => React.null
        }}
        <meta property="og:title" content=title key="ogtitle" />
        {switch image_url {
        | Some(image_url) => <meta property="og:image" content=image_url key="ogimage" />
        | None => React.null
        }}
        <meta property="og:site_name" content=Index.siteName key="ogsitename" />
        <meta name="twitter:card" content="summary" key="twcard" />
      </Next.Head>
      <Player public_id />
      {switch html_description {
      | Some(html_description) =>
        <div
          className="text-justify m-3 text-gray-800 space-y-5"
          dangerouslySetInnerHTML={"__html": html_description}
        />
      | None => React.null
      }}
    </div>
  | exception S.Error(e) =>
    Console.error2("an error occurred while loading the podcast", e)
    <div>
      <h1> {`Ouups !!`->s} </h1>
      <p>
        {`Il y a eu une erreur lors de la récupération de l'épisode, veuillez réessayer.`->s}
      </p>
    </div>
  }

let getServerSideProps: Next.GetServerSideProps.t<props, {.}> = async ({query}) => {
  let public_id = query->Dict.get("public_id")->Option.getOrThrow
  let episod = await Api.Podcast.SingleByPublicId.get(public_id)
  let props = {episod: episod}
  {"props": props}
}

open Utils

module P = {
  @react.component
  let make = (~children) => <p className="mb-2"> children </p>
}

type props = {show: JSON.t}

module Player = {
  let code = `<iframe frameborder="0" loading="lazy" id="ausha-Q0Lh" height="420" style="border: none; width:100%; height:420px" src="https://player.ausha.co/index.html?showId=od2PjTvjJpwV&color=%239b4d1c&playlist=true&v=3&playerId=ausha-Q0Lh"></iframe><script src="https://player.ausha.co/ausha-player.js"></script>`

  @react.component
  let make = () => <div className="mt-5" dangerouslySetInnerHTML={"__html": code} />
}

module Icon = {
  @react.component
  let make = (~src, ~url) =>
    <a target="_blank" className="w-16 m-2 opacity-75 hover:opacity-50 text-red-500" href=url>
      <img src />
    </a>
}

let makeIcon = (~src, ~url, ~key) => Some(<Icon src url key />)

let siteName = `Goûtues - Podcast`

let default = ({show}: props) =>
  switch show->S.parseJsonOrThrow(Api.Shows.SingleById.schema) {
  | {data: {description, html_description, image_url, listening_links: {data: links}}} =>
    let title = siteName
    <div className="flex flex-col">
      <Next.Head>
        <title> {s(title)} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content=description />
        <meta property="og:title" content=title key="ogtitle" />
        <meta property="og:image" content=image_url key="ogimage" />
        <meta property="og:site_name" content=siteName key="ogsitename" />
        <meta property="og:description" content=description key="ogdesc" />
        <meta name="twitter:card" content="summary" key="twcard" />
      </Next.Head>
      <div className="justify-center my-5">
        <div className="text-3xl mx-5 font-display font-bold text-center text-gray-700">
          {`Retrouvez-nous sur toutes ces plateformes`->s}
        </div>
        <div className="flex flex-row justify-center my-5">
          {links
          ->Array.filterMap(({key, url}) =>
            switch key {
            | "itunes" => makeIcon(~src="static/apple-podcasts.png", ~url, ~key)
            | "spotify" => makeIcon(~src="static/spotify.svg", ~url, ~key)
            | "deezer" => makeIcon(~src="static/deezer.svg", ~url, ~key)
            | "soundcloud" => makeIcon(~src="static/soundcloud.svg", ~url, ~key)
            | _ => None
            }
          )
          ->React.array}
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse items-center px-2">
        <img className="md:w-1/3 md:max-w-lg" src=image_url />
        <div
          className="space-y-5 mx-2 md:mx-0 my-10 md:my-5 md:w-2/3 md:mr-12 text-justify text-gray-700"
          dangerouslySetInnerHTML={"__html": html_description}
        />
      </div>
      <Player />
    </div>
  | exception S.Error(error) =>
    Console.error(error)
    <P>
      {"Il y a eu un problème lors de la récupération des informations. Veuillez recharger la page."->s}
    </P>
  }

let getServerSideProps: Next.GetServerSideProps.t<props, {.}> = async _ctx => {
  let show = await Api.Shows.SingleById.get()
  let props = {show: show}
  {"props": props}
}

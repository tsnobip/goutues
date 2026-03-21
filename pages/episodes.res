open Api.Common
open Utils

type props = {
  episods: JSON.t,
  show: JSON.t,
}

let default = ({episods, show}: props) =>
  switch (
    episods->S.parseJsonOrThrow(Api.Podcasts.schema),
    show->S.parseJsonOrThrow(Api.Shows.SingleById.schema),
  ) {
  | ({data: episods}, {data: {description, image_url}}) =>
    let title = `Goûtues - Épisodes`
    <div
      className="justify-items-center p-2 gap-5 md:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <Next.Head>
        <title> {s(title)} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content=description />
        <meta property="og:title" content=title key="ogtitle" />
        <meta property="og:image" content=image_url key="ogimage" />
        <meta property="og:site_name" content=Index.siteName key="ogsitename" />
        <meta property="og:description" content=description key="ogdesc" />
        <meta name="twitter:card" content="summary" key="twcard" />
      </Next.Head>
      {episods
      ->Array.map(episod => {
        open Api.Podcast
        <EpisodCard key=episod.public_id episod />
      })
      ->Array.toReversed
      ->React.array}
    </div>
  | exception S.Error(e) =>
    Console.error2("an error occurred while loading the podcasts", e)
    <div>
      <h1> {`Ouups !!`->s} </h1>
      <p>
        {`Il y a eu une erreur lors de la récupération des épisodes, veuillez réessayer.`->s}
      </p>
    </div>
  }

let getServerSideProps: Next.GetServerSideProps.t<props, {.}> = async _ctx => {
  let episods = await Api.Podcasts.get(~public=true, ())
  let show = await Api.Shows.SingleById.get()
  let props = {episods, show}
  {"props": props}
}

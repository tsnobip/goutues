open Belt;
open Api.Common;
open Utils;

type props = {
  episods: Js.Json.t,
  show: Js.Json.t,
};

let default = ({episods, show}: props) =>
  switch (episods->Api.Podcasts.t_decode, show->Api.Shows.SingleById.t_decode) {
  | (Result.Error(e), _)
  | (_, Result.Error(e)) =>
    Js.Console.error2("an error occurred while loading the podcasts", e);
    <div>
      <h1> {js|Ouups !!|js}->s </h1>
      <p>
        {js|Il y a eu une erreur lors de la récupération des épisodes, veuillez réessayer.|js}
        ->s
      </p>
    </div>;
  | (
      Result.Ok({data: episods}),
      Result.Ok({data: {html_description, image_url}}),
    ) =>
    let title = {js|Goûtues - Épisodes|js};
    <div
      className="justify-items-center p-2 gap-5 md:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Next.Head>
        <title> {s(title)} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content=html_description />
        <meta property="og:title" content=title key="ogtitle" />
        <meta property="og:image" content=image_url key="ogimage" />
        <meta
          property="og:site_name"
          content=Index.siteName
          key="ogsitename"
        />
        <meta
          property="og:description"
          content=html_description
          key="ogdesc"
        />
        <meta name="twitter:card" content="summary" key="twcard" />
      </Next.Head>
      {episods
       ->Array.reverse
       ->Array.map(episod => {
           Api.Podcast.(<EpisodCard key={episod.public_id} episod />)
         })
       ->React.array}
    </div>;
  };

let getServerSideProps: Next.GetServerSideProps.t(props, {.}) =
  _ctx => {
    let episods = Api.Podcasts.get(~public=true, ());
    let show = Api.Shows.SingleById.get();
    Promise.all2(episods, show)
    ->Promise.map(((episods, show)) => {
        let props = {episods, show};
        {"props": props};
      });
  };

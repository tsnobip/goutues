open Belt;
open Api.Common;
open Utils;

type props = {episods: Js.Json.t};

let default = ({episods}: props) =>
  switch (episods->Api.Podcasts.t_decode) {
  | Result.Error(e) =>
    Js.Console.error2("an error occurred while loading the podcasts", e);
    <div>
      <h1> {|Ouups !!|}->s </h1>
      <p>
        {js|Il y a eu une erreur lors de la récupération des épisodes, veuillez réessayer.|js}
        ->s
      </p>
    </div>;
  | Result.Ok({data: episods}) =>
    <div
      className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {episods
       ->Array.reverse
       ->Array.map(episod => {
           Api.Podcast.(<EpisodCard key={episod.public_id} episod />)
         })
       ->React.array}
    </div>
  };

let getServerSideProps: Next.GetServerSideProps.t(props, {.}) =
  _ctx => {
    Api.Podcasts.get(~public=true, ())
    ->Promise.map(episods => {
        let props = {episods: episods};
        {"props": props};
      });
  };

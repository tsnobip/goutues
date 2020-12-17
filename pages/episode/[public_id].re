open Belt;
open Api.Common;
open Utils;

type props = {episod: Js.Json.t};

module Player = {
  [@react.component]
  let make = (~public_id) => {
    let code = {j|<iframe frameborder="0" loading="lazy" id="ausha-dwpf" height="220" style="border: none; width:100%; height:220px" src="https://player.ausha.co/index.html?showId=od2PjTvjJpwV&color=%239b4d1c&podcastId=$public_id&v=3&playerId=ausha-dwpf"></iframe><script src="https://player.ausha.co/ausha-player.js"></script>
|j};
    <div className="mt-5" dangerouslySetInnerHTML={"__html": code} />;
  };
};

let default = ({episod}: props) =>
  switch (episod->Api.Podcast.SingleByPublicId.t_decode) {
  | Result.Error(e) =>
    Js.Console.error2("an error occurred while loading the podcast", e);
    <div>
      <h1> {js|Ouups !!|js}->s </h1>
      <p>
        {js|Il y a eu une erreur lors de la récupération de l'épisode, veuillez réessayer.|js}
        ->s
      </p>
    </div>;
  | Result.Ok({data: {html_description, public_id}}) =>
    <div>
      <Player public_id />
      {switch (html_description) {
       | Some(html_description) =>
         <div
           className="text-justify m-3 text-gray-800 space-y-5"
           dangerouslySetInnerHTML={"__html": html_description}
         />
       | None => React.null
       }}
    </div>
  };

let getServerSideProps: Next.GetServerSideProps.t(props, {.}) =
  ({query}) => {
    let public_id = query->Js.Dict.get("public_id")->Option.getExn;
    Api.Podcast.SingleByPublicId.get(public_id)
    ->Promise.map(episod => {
        let props = {episod: episod};
        {"props": props};
      });
  };

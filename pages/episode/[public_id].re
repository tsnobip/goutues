open Belt;
open Api.Common;
open Utils;

type props = {episod: Js.Json.t};

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
  | Result.Ok({data: {html_description}}) =>
    <div>
      {switch (html_description) {
       | Some(html_description) =>
         <div dangerouslySetInnerHTML={"__html": html_description} />
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

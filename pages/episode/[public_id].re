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
  | Result.Ok({
      data: {html_description, description, name, image_url, public_id},
    }) =>
    let title = name;
    <div>
      <Next.Head>
        <title> {s(title)} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {switch (description) {
         | Some(description) =>
           <>
             <meta name="description" content=description />
             <meta
               property="og:description"
               content=description
               key="ogdesc"
             />
           </>
         | None => React.null
         }}
        <meta property="og:title" content=title key="ogtitle" />
        {switch (image_url) {
         | Some(image_url) =>
           <meta property="og:image" content=image_url key="ogimage" />
         | None => React.null
         }}
        <meta
          property="og:site_name"
          content=Index.siteName
          key="ogsitename"
        />
        <meta name="twitter:card" content="summary" key="twcard" />
      </Next.Head>
      <Player public_id />
      {switch (html_description) {
       | Some(html_description) =>
         <div
           className="text-justify m-3 text-gray-800 space-y-5"
           dangerouslySetInnerHTML={"__html": html_description}
         />
       | None => React.null
       }}
    </div>;
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

open Belt;
open Utils;

module P = {
  [@react.component]
  let make = (~children) => <p className="mb-2"> children </p>;
};

type props = {show: Js.Json.t};

module Player = {
  let code = {js|<iframe frameborder="0" loading="lazy" id="ausha-stoy" height="420" style="border: none; width:100%; height:420px" src="https://player.ausha.co/index.html?showId=od2PjTvjJpwV&color=%239b4d1c&multishow=true&playlist=true&v=3&playerId=ausha-stoy"></iframe><script src="https://player.ausha.co/ausha-player.js"></script>|js};

  [@react.component]
  let make = () =>
    <div className="mt-5" dangerouslySetInnerHTML={"__html": code} />;
};

module Icon = {
  [@react.component]
  let make = (~src, ~url) =>
    <a target="_blank" className="w-16 m-2" href=url> <img src /> </a>;
};

let makeIcon = (~src, ~url) => Some(<Icon src url />);

let default = ({show}: props) =>
  switch (show->Api.Shows.SingleById.t_decode) {
  | Result.Ok({data: {html_description, image_url, links: {data: links}}}) =>
    <div className="flex flex-col">
      <div className="justify-center my-5">
        <div className="text-3xl font-bold text-center">
          {js|Retrouvez-nous sur toutes ces plateformes|js}->s
        </div>
        <div className="flex flex-row justify-center my-5">
          {links
           ->Array.keepMap(({key, url}) =>
               switch (key) {
               | "itunes" => makeIcon(~src="static/apple-podcasts.png", ~url)
               | "spotify" => makeIcon(~src="static/spotify.svg", ~url)
               | "deezer" => makeIcon(~src="static/deezer.svg", ~url)
               | "soundcloud" => makeIcon(~src="static/soundcloud.svg", ~url)
               | _ => None
               }
             )
           ->React.array}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center px-3">
        <div
          className="flex-grow  lg:mr-20 text-justify"
          dangerouslySetInnerHTML={"__html": html_description}
        />
        <img
          className="object-contain bg-red-500 flex-shrink w-full lg:w-auto"
          src=image_url
        />
      </div>
      <Player />
    </div>
  | Result.Error(error) =>
    Js.Console.error(error);
    <P>
      {j|Il y a eu un problème lors de la récupération des informations. Veuillez recharger la page.|j}
      ->s
    </P>;
  };

let getServerSideProps: Next.GetServerSideProps.t(props, {.}) =
  _ctx => {
    Api.Shows.SingleById.get()
    ->Promise.map(show => {
        let props = {show: show};
        {"props": props};
      });
  };

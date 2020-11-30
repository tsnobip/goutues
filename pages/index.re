open Belt;
open Utils;

module P = {
  [@react.component]
  let make = (~children) => <p className="mb-2"> children </p>;
};

type props = {show: Js.Json.t};

let default = ({show}: props) =>
  switch (show->Api.Shows.SingleById.t_decode) {
  | Result.Ok({data: show}) =>
    <div dangerouslySetInnerHTML={"__html": show.Api.Show.html_description} />
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

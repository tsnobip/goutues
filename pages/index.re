module P = {
  [@react.component]
  let make = (~children) => <p className="mb-2"> children </p>;
};

let default = () =>
  <div>
    <h1 className="text-3xl font-semibold">
      {js|Goûtues c'est quoi ?|js}->ReasonReact.string
    </h1>
    <P>
      {React.string(
         {j|Goûtues est un tour de France des femmes gastronomes.|j},
       )}
    </P>
  </div>;



import * as React from "react";

function Index$P(Props) {
  var children = Props.children;
  return React.createElement("p", {
              className: "mb-2"
            }, children);
}

function $$default(param) {
  return React.createElement("div", undefined, React.createElement("h1", {
                  className: "text-3xl font-semibold"
                }, "Goûtues c\'est quoi ?"), React.createElement(Index$P, {
                  children: "Goûtues est un tour de France des femmes gastronomes."
                }));
}

export {
  $$default ,
  $$default as default,
  
}
/* react Not a pure module */

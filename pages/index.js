

import * as Api from "../common/Api.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Utils from "../common/Utils.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.js";

function Index$P(Props) {
  var children = Props.children;
  return React.createElement("p", {
              className: "mb-2"
            }, children);
}

function $$default(param) {
  var error = Curry._1(Api.Shows.SingleById.t_decode, param.show);
  if (!error.TAG) {
    return React.createElement("div", {
                dangerouslySetInnerHTML: {
                  __html: error._0.data.html_description
                }
              });
  }
  console.error(error._0);
  return React.createElement(Index$P, {
              children: Utils.s("Il y a eu un problème lors de la récupération des informations. Veuillez recharger la page.")
            });
}

function getServerSideProps(_ctx) {
  return $$Promise.map(Curry._1(Api.Shows.SingleById.get, undefined), (function (show) {
                return {
                        props: {
                          show: show
                        }
                      };
              }));
}

export {
  $$default ,
  $$default as default,
  getServerSideProps ,
  
}
/* Api Not a pure module */

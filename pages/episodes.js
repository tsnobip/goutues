

import * as Api from "../common/Api.js";
import * as Utils from "../common/Utils.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as EpisodCard from "../components/EpisodCard.js";

function $$default(param) {
  var e = Api.Podcasts.t_decode(param.episods);
  if (!e.TAG) {
    return React.createElement("div", {
                className: "justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }, Belt_Array.map(Belt_Array.reverse(e._0.data), (function (episod) {
                      return React.createElement(EpisodCard.make, {
                                  episod: episod,
                                  key: episod.public_id
                                });
                    })));
  }
  console.error("an error occurred while loading the podcasts", e._0);
  return React.createElement("div", undefined, React.createElement("h1", undefined, Utils.s("Ouups\xc2\xa0!!")), React.createElement("p", undefined, Utils.s("Il y a eu une erreur lors de la récupération des épisodes, veuillez réessayer.")));
}

function getServerSideProps(_ctx) {
  return $$Promise.map(Api.Podcasts.get(true, undefined, undefined, undefined), (function (episods) {
                return {
                        props: {
                          episods: episods
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

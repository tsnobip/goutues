

import * as Api from "../../common/Api.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Utils from "../../common/Utils.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";

function $$default(param) {
  var e = Curry._1(Api.Podcast.SingleByPublicId.t_decode, param.episod);
  if (e.TAG) {
    console.error("an error occurred while loading the podcast", e._0);
    return React.createElement("div", undefined, React.createElement("h1", undefined, Utils.s("Ouups !!")), React.createElement("p", undefined, Utils.s("Il y a eu une erreur lors de la récupération de l\'épisode, veuillez réessayer.")));
  }
  var html_description = e._0.data.html_description;
  return React.createElement("div", undefined, html_description !== undefined ? React.createElement("div", {
                    dangerouslySetInnerHTML: {
                      __html: html_description
                    }
                  }) : null);
}

function getServerSideProps(param) {
  var public_id = Belt_Option.getExn(Js_dict.get(param.query, "public_id"));
  return $$Promise.map(Curry._1(Api.Podcast.SingleByPublicId.get, public_id), (function (episod) {
                return {
                        props: {
                          episod: episod
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

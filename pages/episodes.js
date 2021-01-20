

import * as Api from "../common/Api.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Index from "./index.js";
import * as Utils from "../common/Utils.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.js";
import Head from "next/head";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as EpisodCard from "../components/EpisodCard.js";

function $$default(param) {
  var match = Api.Podcasts.t_decode(param.episods);
  var match$1 = Curry._1(Api.Shows.SingleById.t_decode, param.show);
  var e;
  if (match.TAG) {
    e = match._0;
  } else if (match$1.TAG) {
    e = match$1._0;
  } else {
    var match$2 = match$1._0.data;
    var description = match$2.description;
    var title = "Goûtues - Épisodes";
    return React.createElement("div", {
                className: "justify-items-center p-2 gap-5 md:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }, React.createElement(Head, {
                    children: null
                  }, React.createElement("title", undefined, Utils.s(title)), React.createElement("meta", {
                        content: "width=device-width, initial-scale=1",
                        name: "viewport"
                      }), React.createElement("meta", {
                        charSet: "utf-8"
                      }), React.createElement("meta", {
                        content: description,
                        name: "description"
                      }), React.createElement("meta", {
                        key: "ogtitle",
                        content: title,
                        property: "og:title"
                      }), React.createElement("meta", {
                        key: "ogimage",
                        content: match$2.image_url,
                        property: "og:image"
                      }), React.createElement("meta", {
                        key: "ogsitename",
                        content: Index.siteName,
                        property: "og:site_name"
                      }), React.createElement("meta", {
                        key: "ogdesc",
                        content: description,
                        property: "og:description"
                      }), React.createElement("meta", {
                        key: "twcard",
                        content: "summary",
                        name: "twitter:card"
                      })), Belt_Array.reverse(Belt_Array.map(match._0.data, (function (episod) {
                          return React.createElement(EpisodCard.make, {
                                      episod: episod,
                                      key: episod.public_id
                                    });
                        }))));
  }
  console.error("an error occurred while loading the podcasts", e);
  return React.createElement("div", undefined, React.createElement("h1", undefined, Utils.s("Ouups !!")), React.createElement("p", undefined, Utils.s("Il y a eu une erreur lors de la récupération des épisodes, veuillez réessayer.")));
}

function getServerSideProps(_ctx) {
  var episods = Api.Podcasts.get(true, undefined, undefined, undefined, undefined, undefined, undefined);
  var show = Curry._1(Api.Shows.SingleById.get, undefined);
  return $$Promise.map($$Promise.all2(episods, show), (function (param) {
                return {
                        props: {
                          episods: param[0],
                          show: param[1]
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

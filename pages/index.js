

import * as Api from "../common/Api.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Utils from "../common/Utils.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function Index$P(Props) {
  var children = Props.children;
  return React.createElement("p", {
              className: "mb-2"
            }, children);
}

function Index$Player(Props) {
  return React.createElement("div", {
              className: "mt-5",
              dangerouslySetInnerHTML: {
                __html: "<iframe frameborder=\"0\" loading=\"lazy\" id=\"ausha-Q0Lh\" height=\"420\" style=\"border: none; width:100%; height:420px\" src=\"https://player.ausha.co/index.html?showId=od2PjTvjJpwV&color=%239b4d1c&playlist=true&v=3&playerId=ausha-Q0Lh\"></iframe><script src=\"https://player.ausha.co/ausha-player.js\"></script>"
              }
            });
}

function Index$Icon(Props) {
  var src = Props.src;
  var url = Props.url;
  return React.createElement("a", {
              className: "w-16 m-2",
              href: url,
              target: "_blank"
            }, React.createElement("img", {
                  src: src
                }));
}

function makeIcon(src, url) {
  return Caml_option.some(React.createElement(Index$Icon, {
                  src: src,
                  url: url
                }));
}

function $$default(param) {
  var error = Curry._1(Api.Shows.SingleById.t_decode, param.show);
  if (error.TAG) {
    console.error(error._0);
    return React.createElement(Index$P, {
                children: Utils.s("Il y a eu un problème lors de la récupération des informations. Veuillez recharger la page.")
              });
  }
  var match = error._0.data;
  return React.createElement("div", {
              className: "flex flex-col"
            }, React.createElement("div", {
                  className: "justify-center my-5"
                }, React.createElement("div", {
                      className: "text-3xl font-bold text-center text-gray-800"
                    }, Utils.s("Retrouvez-nous sur toutes ces plateformes")), React.createElement("div", {
                      className: "flex flex-row justify-center my-5"
                    }, Belt_Array.keepMap(match.links.data, (function (param) {
                            var url = param.url;
                            switch (param.key) {
                              case "deezer" :
                                  return makeIcon("static/deezer.svg", url);
                              case "itunes" :
                                  return makeIcon("static/apple-podcasts.png", url);
                              case "soundcloud" :
                                  return makeIcon("static/soundcloud.svg", url);
                              case "spotify" :
                                  return makeIcon("static/spotify.svg", url);
                              default:
                                return ;
                            }
                          })))), React.createElement("div", {
                  className: "flex flex-col lg:flex-row items-center px-3"
                }, React.createElement("div", {
                      className: "flex-grow  lg:mr-20 text-justify text-gray-800",
                      dangerouslySetInnerHTML: {
                        __html: match.html_description
                      }
                    }), React.createElement("img", {
                      className: "object-contain bg-red-500 flex-shrink w-full lg:w-auto",
                      src: match.image_url
                    })), React.createElement(Index$Player, {}));
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

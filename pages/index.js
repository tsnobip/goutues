

import * as Api from "../common/Api.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Utils from "../common/Utils.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.js";
import Head from "next/head";
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
              className: "w-16 m-2 opacity-75 hover:opacity-50 text-red-500",
              href: url,
              target: "_blank"
            }, React.createElement("img", {
                  src: src
                }));
}

function makeIcon(src, url, key) {
  return Caml_option.some(React.createElement(Index$Icon, {
                  src: src,
                  url: url,
                  key: key
                }));
}

var siteName = "Goûtues - Podcast";

function $$default(param) {
  var error = Curry._1(Api.Shows.SingleById.t_decode, param.show);
  if (error.TAG) {
    console.error(error._0);
    return React.createElement(Index$P, {
                children: Utils.s("Il y a eu un problème lors de la récupération des informations. Veuillez recharger la page.")
              });
  }
  var match = error._0.data;
  var image_url = match.image_url;
  var description = match.description;
  return React.createElement("div", {
              className: "flex flex-col"
            }, React.createElement(Head, {
                  children: null
                }, React.createElement("title", undefined, Utils.s(siteName)), React.createElement("meta", {
                      content: "width=device-width, initial-scale=1",
                      name: "viewport"
                    }), React.createElement("meta", {
                      charSet: "utf-8"
                    }), React.createElement("meta", {
                      content: description,
                      name: "description"
                    }), React.createElement("meta", {
                      key: "ogtitle",
                      content: siteName,
                      property: "og:title"
                    }), React.createElement("meta", {
                      key: "ogimage",
                      content: image_url,
                      property: "og:image"
                    }), React.createElement("meta", {
                      key: "ogsitename",
                      content: siteName,
                      property: "og:site_name"
                    }), React.createElement("meta", {
                      key: "ogdesc",
                      content: description,
                      property: "og:description"
                    }), React.createElement("meta", {
                      key: "twcard",
                      content: "summary",
                      name: "twitter:card"
                    })), React.createElement("div", {
                  className: "justify-center my-5"
                }, React.createElement("div", {
                      className: "text-3xl mx-5 font-display font-bold text-center text-gray-700"
                    }, Utils.s("Retrouvez-nous sur toutes ces plateformes")), React.createElement("div", {
                      className: "flex flex-row justify-center my-5"
                    }, Belt_Array.keepMap(match.links.data, (function (param) {
                            var url = param.url;
                            var key = param.key;
                            switch (key) {
                              case "deezer" :
                                  return makeIcon("static/deezer.svg", url, key);
                              case "itunes" :
                                  return makeIcon("static/apple-podcasts.png", url, key);
                              case "soundcloud" :
                                  return makeIcon("static/soundcloud.svg", url, key);
                              case "spotify" :
                                  return makeIcon("static/spotify.svg", url, key);
                              default:
                                return ;
                            }
                          })))), React.createElement("div", {
                  className: "flex flex-col md:flex-row-reverse items-center px-2"
                }, React.createElement("img", {
                      className: "md:w-1/3 md:max-w-lg",
                      src: image_url
                    }), React.createElement("div", {
                      className: "space-y-5 mx-2 md:mx-0 my-10 md:my-5 md:w-2/3 md:mr-12 text-justify text-gray-700",
                      dangerouslySetInnerHTML: {
                        __html: match.html_description
                      }
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
  siteName ,
  getServerSideProps ,
  
}
/* Api Not a pure module */

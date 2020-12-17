

import * as Api from "../../common/Api.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Utils from "../../common/Utils.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";

function $lbrackpublic_id$rbrack$Player(Props) {
  var public_id = Props.public_id;
  var code = "<iframe frameborder=\"0\" loading=\"lazy\" id=\"ausha-dwpf\" height=\"220\" style=\"border: none; width:100%; height:220px\" src=\"https://player.ausha.co/index.html?showId=od2PjTvjJpwV&color=%239b4d1c&podcastId=" + public_id + "&v=3&playerId=ausha-dwpf\"></iframe><script src=\"https://player.ausha.co/ausha-player.js\"></script>\n";
  return React.createElement("div", {
              className: "mt-5",
              dangerouslySetInnerHTML: {
                __html: code
              }
            });
}

function $$default(param) {
  var e = Curry._1(Api.Podcast.SingleByPublicId.t_decode, param.episod);
  if (e.TAG) {
    console.error("an error occurred while loading the podcast", e._0);
    return React.createElement("div", undefined, React.createElement("h1", undefined, Utils.s("Ouups !!")), React.createElement("p", undefined, Utils.s("Il y a eu une erreur lors de la récupération de l\'épisode, veuillez réessayer.")));
  }
  var match = e._0.data;
  var html_description = match.html_description;
  return React.createElement("div", undefined, React.createElement($lbrackpublic_id$rbrack$Player, {
                  public_id: match.public_id
                }), html_description !== undefined ? React.createElement("div", {
                    className: "text-justify m-3 text-gray-800 space-y-5",
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

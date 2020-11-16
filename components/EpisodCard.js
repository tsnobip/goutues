

import * as Utils from "../common/Utils.js";
import * as React from "react";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";

var defaultImage = "https://image.ausha.co/y16tcxiM957ICPP3MtB2HvmB9ot3e5di2OiKSMMd_400x400.jpeg";

function EpisodCard(Props) {
  var param = Props.episod;
  return React.createElement("div", {
              className: "max-w-sm rounded-3xl overflow-hidden m-5 flex flex-col items-center bg-yellow relative"
            }, React.createElement("img", {
                  className: "object-contain",
                  src: Belt_Option.getWithDefault(param.image_url, defaultImage)
                }), React.createElement("div", {
                  className: "absolute top-0 right-0 bg-yellow rounded-full text-brown m-3 p-3 w-12 h-12 leading-none text-center inline-block align-middle"
                }, Utils.s(param.published_at.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}))), React.createElement("div", {
                  className: "text-center p-2 text-brown flex-auto"
                }, Utils.s(param.name)));
}

var make = EpisodCard;

export {
  defaultImage ,
  make ,
  
}
/* react Not a pure module */

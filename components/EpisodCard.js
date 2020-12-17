

import * as Utils from "../common/Utils.js";
import * as React from "react";
import Link from "next/link";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";

var defaultImage = "https://image.ausha.co/y16tcxiM957ICPP3MtB2HvmB9ot3e5di2OiKSMMd_400x400.jpeg";

function EpisodCard(Props) {
  var param = Props.episod;
  return React.createElement(Link, {
              href: "/episode/" + param.public_id,
              children: React.createElement("a", {
                    className: "max-w-sm rounded-xl overflow-hidden flex flex-col items-center bg-gray-200 shadow-2xl"
                  }, React.createElement("img", {
                        className: "object-contain",
                        src: Belt_Option.getWithDefault(param.image_url, defaultImage)
                      }), React.createElement("div", {
                        className: "flex-auto p-2"
                      }, React.createElement("div", {
                            className: "text-gray-500 capitalize"
                          }, Utils.s(param.published_at.toLocaleDateString(undefined, {month: 'short', year: 'numeric'}))), React.createElement("div", {
                            className: "text-gray-700"
                          }, Utils.s(param.name))))
            });
}

var make = EpisodCard;

export {
  defaultImage ,
  make ,
  
}
/* react Not a pure module */



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
                    className: "max-w-sm overflow-hidden flex flex-col items-center bg-gray-100 shadow-2xl hover:opacity-75"
                  }, React.createElement("img", {
                        className: "object-contain p-5",
                        src: Belt_Option.getWithDefault(param.image_url, defaultImage)
                      }), React.createElement("div", {
                        className: "flex-auto px-5 pb-5"
                      }, React.createElement("div", {
                            className: "text-gray-500 capitalize font-display"
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

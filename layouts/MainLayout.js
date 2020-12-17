

import * as React from "react";
import Link from "next/link";

function MainLayout$Navigation(Props) {
  return React.createElement("nav", {
              className: "px-2 py-2 mt-2 pb-5 h-12 flex border-b-2 border-yellow justify-between items-center text-lg"
            }, React.createElement(Link, {
                  href: "/",
                  children: React.createElement("a", {
                        className: "flex items-center w-1/3"
                      }, React.createElement("span", {
                            className: "text-orange-800 text-5xl font-semibold font-wildy"
                          }, "Goutues"))
                }), React.createElement("div", {
                  className: "flex w-2/3 justify-end"
                }, React.createElement(Link, {
                      href: "/episodes",
                      children: React.createElement("a", {
                            className: "px-3"
                          }, "Épisodes")
                    }), React.createElement("div", {
                      className: "flex flex-row items-center"
                    }, React.createElement("a", {
                          className: "px-1",
                          href: "https://facebook.com/goutues",
                          target: "_blank"
                        }, React.createElement("img", {
                              className: "h-6",
                              src: "/static/ri-facebook-circle-line.svg"
                            })), React.createElement("a", {
                          className: "px-1",
                          href: "https://www.instagram.com/goutues/",
                          target: "_blank"
                        }, React.createElement("img", {
                              className: "h-6",
                              href: "instagram.com",
                              src: "/static/ri-instagram-line.svg",
                              target: "_blank"
                            })), React.createElement("a", {
                          className: "px-1",
                          href: "https://smartlink.ausha.co/goutues",
                          target: "_blank"
                        }, React.createElement("img", {
                              className: "w-16",
                              src: "/static/ausha.svg"
                            })))));
}

var Navigation = {
  make: MainLayout$Navigation
};

function MainLayout(Props) {
  var children = Props.children;
  var minWidth = {
    minWidth: "20rem"
  };
  return React.createElement("div", {
              className: "flex lg:justify-center",
              style: minWidth
            }, React.createElement("div", {
                  className: "max-w-5xl w-full lg:w-3/4 text-gray-900 font-base"
                }, React.createElement(MainLayout$Navigation, {}), React.createElement("main", {
                      className: "mt-4"
                    }, children)));
}

var Link$1;

var make = MainLayout;

export {
  Link$1 as Link,
  Navigation ,
  make ,
  
}
/* react Not a pure module */

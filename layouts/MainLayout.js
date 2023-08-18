

import * as React from "react";
import Link from "next/link";

function MainLayout$Icon(Props) {
  var href = Props.link;
  var children = Props.children;
  return React.createElement("a", {
              className: "px-1 opacity-75 hover:opacity-50",
              href: href,
              target: "_blank"
            }, children);
}

var Icon = {
  make: MainLayout$Icon
};

function MainLayout$Navigation(Props) {
  return React.createElement("nav", {
              className: "px-2 pt-1 pb-2 flex border-b-4 mb-10 border-yellow justify-between items-baseline text-lg"
            }, React.createElement(Link, {
                  href: "/",
                  children: React.createElement("a", undefined, React.createElement("span", {
                            className: "text-brown text-4xl md:text-5xl font-semibold font-logo"
                          }, "Goutues"))
                }), React.createElement("div", {
                  className: "flex items-center"
                }, React.createElement("div", {
                      className: "px-3 font-display hover:opacity-75"
                    }, React.createElement(Link, {
                          href: "/episodes",
                          children: React.createElement("a", undefined, "Épisodes")
                        })), React.createElement("div", {
                      className: "flex flex-row items-center"
                    }, React.createElement(MainLayout$Icon, {
                          link: "https://facebook.com/goutues",
                          children: React.createElement("img", {
                                className: "h-6",
                                src: "/static/ri-facebook-circle-line.svg"
                              })
                        }), React.createElement(MainLayout$Icon, {
                          link: "https://www.instagram.com/goutues/",
                          children: React.createElement("img", {
                                className: "h-6",
                                src: "/static/ri-instagram-line.svg"
                              })
                        }), React.createElement(MainLayout$Icon, {
                          link: "https://podcast.ausha.co/goutues",
                          children: React.createElement("img", {
                                className: "w-16",
                                src: "/static/ausha.svg"
                              })
                        }))));
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
                  className: "max-w-5xl w-full lg:w-3/4 text-gray-700 font-base"
                }, React.createElement(MainLayout$Navigation, {}), React.createElement("main", {
                      className: "my-4"
                    }, children)));
}

var Link$1;

var make = MainLayout;

export {
  Link$1 as Link,
  Icon ,
  Navigation ,
  make ,
  
}
/* react Not a pure module */

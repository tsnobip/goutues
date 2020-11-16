

import * as React from "react";
import * as MainLayout from "../layouts/MainLayout.js";
import * as Router from "next/router";

import '../styles/main.css'
;

function $$default(props) {
  var router = Router.useRouter();
  var content = React.createElement(props.Component, props.pageProps);
  var match = router.route;
  if (match === "/episodes") {
    return React.createElement(MainLayout.make, {
                children: content
              });
  } else {
    return React.createElement(MainLayout.make, {
                children: content
              });
  }
}

export {
  $$default ,
  $$default as default,
  
}
/*  Not a pure module */

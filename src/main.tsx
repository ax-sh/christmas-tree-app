import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import ReactGA from "react-ga4";

ReactGA.initialize("G-HC2JMRH067");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

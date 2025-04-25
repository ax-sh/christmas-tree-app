import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";

import ReactGA from "react-ga4";

// OLD 'UA-215876059-1'
ReactGA.initialize("G-HC2JMRH067");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

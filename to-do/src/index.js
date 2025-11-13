import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

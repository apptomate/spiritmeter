import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import "antd/dist/antd.css";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://6dcae9b438bc422984f3ec45fa289de0@sentry.io/1859964"
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();

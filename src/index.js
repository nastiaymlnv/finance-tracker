import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Router from "./Router";

import GlobalStylesReset from "./assets/reset"

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <GlobalStylesReset />
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <RouterProvider router={router}>
        <App />
      </RouterProvider> */}
    </Provider>
  // </React.StrictMode>,
);

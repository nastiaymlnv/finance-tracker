import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { fetchGetTransactions } from "./ducks/operations";
import { fetchGetBalance } from "./ducks/balance";

import GlobalStylesReset from "./assets/reset"

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(fetchGetTransactions());
store.dispatch(fetchGetBalance());

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <GlobalStylesReset />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
);

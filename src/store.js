import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducers from "./ducks";

const getInitialStore = () => {
  return {
    operations: {},
  };
};

export const store = legacy_createStore(
  reducers,
  getInitialStore(),
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => console.log(store.getState()));

export default store;

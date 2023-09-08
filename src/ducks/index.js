import { combineReducers } from "redux";

import getOperationsReducer from "./operations/operationsReducer";

const reducers = combineReducers({
  operations: getOperationsReducer,
});

export default reducers;

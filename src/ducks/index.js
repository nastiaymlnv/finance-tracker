import { combineReducers } from "redux";

import getOperationsReducer from "./operations/operationsReducer";
import balanceReducer from "./balance/balanceReducer";

const reducers = combineReducers({
  operations: getOperationsReducer,
  balance: balanceReducer
});

export default reducers;

import { combineReducers } from "redux";

import fetchPostOperationsReducer from "./operations/operationsReducer";

const reducers = combineReducers ({
    operations: fetchPostOperationsReducer
});

export default reducers;
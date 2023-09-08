import {
  GET_OPERATIONS,
  POST_OPERATION,
  OPERATION_REQUEST_ERROR,
} from "./operationsAction";

const operationsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_OPERATIONS:
      return action.payload;
    case POST_OPERATION:
      return {
        operations: [...state, action.payload],
      };
    case OPERATION_REQUEST_ERROR:
      return { errorMessage: action.payload.message };
    default:
      return state;
  }
};

export default operationsReducer;

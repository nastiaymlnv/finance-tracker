import {
  GET_TRANSACTIONS,
  POST_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTION_REQUEST_ERROR
} from "./operationsAction";

const operationsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.payload;
    case POST_TRANSACTION:
      return {
        operations: [...state, action.payload],
      };
    case UPDATE_TRANSACTION: {
      const newState = state.filter((item) => item.id !== action.payload.id);

      return [...newState, action.payload]
    }
    case DELETE_TRANSACTION: {
      const newState = state.filter((item) => item.id !== action.payload);

      return newState;
    }
    case TRANSACTION_REQUEST_ERROR:
      return { errorStatus: action.payload };
    default:
      return state;
  }
};

export default operationsReducer;

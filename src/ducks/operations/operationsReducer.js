import {
  GET_TRANSACTIONS,
  POST_TRANSACTION,
  UPDATE_TRANSACTION,
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
    case TRANSACTION_REQUEST_ERROR:
      return { errorMessage: action.payload.message };
    default:
      return state;
  }
};

export default operationsReducer;

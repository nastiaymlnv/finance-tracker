import {
    GET_OPERATIONS,
    POST_OPERATION,
    OPERATION_REQUEST_ERROR
} from "./operationsAction";

const operationsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_OPERATIONS:
            return action.operations;
        case POST_OPERATION:
            return {
                ...state,
                operations: action.operation
            };
        case OPERATION_REQUEST_ERROR:
            return {errorMessage: action.payload.message};
        default:
            return state;
    }
}

export default operationsReducer;
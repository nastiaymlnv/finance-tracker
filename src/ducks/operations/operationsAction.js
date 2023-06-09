import axios from 'axios';
import store from '../../store';

export const GET_OPERATIONS = "GET_OPERATIONS";
export const POST_OPERATION = "POST_OPERATION";
export const OPERATION_REQUEST_ERROR = "OPERATION_REQUEST_ERROR";

export const getOperations = (operations) => {
    return {
        type: GET_OPERATIONS,
        operations
    }
}

export const postOperation = (operation) => {
    return {
        type: POST_OPERATION,
        operation
    }
}

export const operationRequestError = (error) => {
    return {
        type: OPERATION_REQUEST_ERROR,
        payload: error.data
    }
}

export const fetchPostOperation = (operationData) => {
    return dispatch => {
        axios
            .post(`http://localhost:3001/operations`, operationData)
            .then(res => {
                console.log('Operation added successfully');
                dispatch(postOperation(res));
            })
            .catch(error => {
                console.log(error.response.data.message);
                dispatch(operationRequestError(error.response));
            });
    }
}

// export const fetchOperations = (operationData) => {
//     return dispatch => {
//         axios
//             .post(`http://localhost:3001/operations`, operationData)
//             .then(res => {
//                 alert('Operation added successfully');
//                 dispatch(postOperation(res));
//             })
//             .catch(error => {
//                 alert(error.response.data.message);
//                 dispatch(operationRequestError(error.response));
//             });
//     }
// }
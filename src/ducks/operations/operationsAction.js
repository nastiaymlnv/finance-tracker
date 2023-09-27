import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const POST_TRANSACTION = "POST_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const TRANSACTION_REQUEST_ERROR = "TRANSACTION_REQUEST_ERROR";

export const getOperations = (data) => {
    return {
        type: GET_TRANSACTIONS,
        payload: data,
    };
};

export const postOperation = (data) => {
    return {
        type: POST_TRANSACTION,
        payload: data,
    };
};

export const updateTransaction = (data) => {
    return {
        type: UPDATE_TRANSACTION,
        payload: data,
    };
};

export const deleteTransaction = (data) => {
    return {
        type: DELETE_TRANSACTION,
        payload: data,
    };
};

export const operationRequestError = (error) => {
    return {
        type: TRANSACTION_REQUEST_ERROR,
        payload: error,
    };
};

export const fetchGetTransactions = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/operations");
            const sortedEvents = response.data
                .slice()
                .sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
            dispatch(getOperations(sortedEvents));
        }
        catch (error) {
            alert(error.message);
            console.log(error);
            dispatch(operationRequestError(error.response.status));
        }
    };
};

export const fetchPostNewTransaction = (operationData) => {
    return (dispatch) => {
        axios
            .post(`http://localhost:3001/operations`, operationData)
            .then(res => {
                dispatch(postOperation(res));
            })
            .catch(error => {
                console.log(error);
                dispatch(operationRequestError(error.response.status));
            });
    };
};

export const fetchUpdateTransaction = (operationData) => {
    return (dispatch) => {
        axios
            .put(`http://localhost:3001/operations/${operationData.id}`, operationData)
            .then(res => {
                dispatch(updateTransaction(res));
            })
            .catch(error => {
                console.log(error);
                dispatch(operationRequestError(error.response.status));
            });
    };
};

export const fetchDeleteTransaction = (transactionId) => {
    return (dispatch) => {
        axios
            .delete(`http://localhost:3001/operations/${transactionId}`)
            .then(
                dispatch(deleteTransaction(transactionId))
            )
            .catch(error => {
                console.log(error);
                dispatch(operationRequestError(error.response.status));
            });
    }
}

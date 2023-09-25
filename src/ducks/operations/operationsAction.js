import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const POST_TRANSACTION = "POST_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
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

export const operationRequestError = (error) => {
    return {
        type: TRANSACTION_REQUEST_ERROR,
        payload: error.data,
    };
};

export const fetchGetTransactions = () => {
    return async (dispatch) => {
        try {
            const response = await axios("http://localhost:3001/operations");
            const sortedEvents = response.data
                .slice()
                .sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
            dispatch(getOperations(sortedEvents));
        }
        catch (error) {
            alert('Failed to fetch');
            console.log(error.response.data.message);
            dispatch(operationRequestError(error.response));
        }
    };
};

export const fetchPostNewTransaction = (operationData) => {
    return (dispatch) => {
        axios
            .post(`http://localhost:3001/operations`, operationData)
            .then((res) => {
                dispatch(postOperation(res));
            })
            .catch((error) => {
                console.log(error.response.data.message);
                dispatch(operationRequestError(error.response));
            });
    };
};

export const fetchUpdateTransaction = (operationData) => {
    return (dispatch) => {
        axios
            .put(`http://localhost:3001/operations/${operationData.id}`, operationData)
            .then((res) => {
                dispatch(updateTransaction(res));
            })
            .catch((error) => {
                console.log(error.response.data.message);
                dispatch(operationRequestError(error.response));
            });
    };
};

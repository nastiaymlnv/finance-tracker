import axios from "axios";

export const GET_BALANCE = "GET_BALANCE";
export const SET_BALANCE = "SET_BALANCE";

export const getBalance = (data) => {
    return {
        type: GET_BALANCE,
        payload: data,
    };
}

export const setBalance = (data) => {
    return {
        type: SET_BALANCE,
        payload: data,
    };
}

export const fetchGetBalance = () => {
    return async (dispatch) => {
        const response = await axios("http://localhost:3001/balance");
        dispatch(getBalance(response.data));
    };
};

export const fetchSetBalance = (newBalance) => {
    return (dispatch) => {
        axios
            .patch(`http://localhost:3001/balance`, {"UAH": newBalance})
            .then((res) => {
                dispatch(setBalance(res));
            })
    };
};
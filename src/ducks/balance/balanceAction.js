import axios from "axios";

export const GET_BALANCE = "GET_BALANCE";
export const UPDATE_BALANCE = "UPDATE_BALANCE";

export const getBalance = (data) => {
    return {
        type: GET_BALANCE,
        payload: data,
    };
}

export const updateBalance = (data) => {
    return {
        type: UPDATE_BALANCE,
        payload: data,
    };
}

export const fetchGetBalance = () => {
    return async (dispatch) => {
        const response = await axios("http://localhost:3001/balance");
        dispatch(getBalance(response.data));
    };
};

export const fetchUpdateBalance = (account, newBalance) => {
    const updateData = { [account]: newBalance };
    return (dispatch) => {
        axios
            .patch(`http://localhost:3001/balance`, updateData)
            .then((res) => {
                dispatch(updateBalance({account, newBalance}));
            })
    };
};
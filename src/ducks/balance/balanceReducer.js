import {
    GET_BALANCE,
    SET_BALANCE
} from "./balanceAction";

const balanceReducer = (state = [], action) => {
    switch (action.type) {
        case GET_BALANCE:
            return action.payload;
        case SET_BALANCE:
            console.log(action.payload.data)
            // return action.payload.data;
            return state
        default:
            return state;
    }
}

export default balanceReducer;
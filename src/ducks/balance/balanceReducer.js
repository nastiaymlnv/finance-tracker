import {
    GET_BALANCE,
    UPDATE_BALANCE
} from "./balanceAction";

const balanceReducer = (state = [], action) => {
    switch (action.type) {
        case GET_BALANCE:
            return action.payload;
        case UPDATE_BALANCE: {
            const [account, newBalance] = action.payload;
            const newState = {
                ...state,
                [account]: newBalance
            }
            return newState;
        }
        default:
            return state;
    }
}

export default balanceReducer;
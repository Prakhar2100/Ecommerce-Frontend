import { ORDER_CREATE, ORDER_CREATE_FAILURE, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_SUCCESS, ORDER_PAY, ORDER_PAY_FAILURE, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/OrderConstants";

export const orderReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case ORDER_CREATE_FAILURE:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}
        default: return state;
    }
}

export const OrderDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case ORDER_DETAILS:
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAILURE:
            return {loading: false, order: action.payload};
        default:
            return state;  
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAY:
            return{ loading: true};
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true};
        case ORDER_PAY_FAILURE:
            return {loading: false, error: action.payload};
        case ORDER_PAY_RESET:
            return {};
        default: return state;
    }
}
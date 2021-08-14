import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_DETAILS } from "../constants/CartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.item === item.item);
            if(existItem) {
                return{
                    ...state, 
                    cartItems: state.cartItems.map((x) => x.item === item.item ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] 
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state, 
                cartItems: state.cartItems.filter((x) => x.item !== action.payload),
            }
        case SAVE_SHIPPING_DETAILS:
            return{
                ...state,
                shippingDetails: action.payload 
            }
        case SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default: return state;
    }
}


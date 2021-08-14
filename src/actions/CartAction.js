import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_DETAILS } from "../constants/CartConstants";

export const addToCart = (itemId, cnt) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/items/${itemId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            stockcnt: data.stockcnt,
            item: data._id,
            cnt
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const RemoveFromCart = (itemId) => async(dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: itemId
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const shippingDetails = (data) => async(dispatch) => {
    console.log(data);
    dispatch({
        type: SAVE_SHIPPING_DETAILS,
        payload: data
    })
    localStorage.setItem('shippingDetails', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })
}
import { ITEMS_FAILURE, ITEMS_REQUEST, ITEMS_SUCCESS, ITEM_FAILURE, ITEM_REQUEST, ITEM_SUCCESS } from "../constants/ItemConst";
import Axios from "axios";

export const itemslist = () => async (dispatch) => {
    dispatch({
        type: ITEMS_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/items');
        dispatch({
            type: ITEMS_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: ITEMS_FAILURE,
            payload: err.message
        })
    }
}

export const itemlist = (itemId) => async (dispatch) => {
    dispatch({
        type: ITEM_REQUEST,
        payload: itemId
    });
    try {
        const {data} = await Axios.get(`/api/items/${itemId}`);
        dispatch({
            type: ITEM_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: ITEM_FAILURE,
            payload: err.response && err.response.data.message ?
            err.response.data.message : err.message
        })
    }
}
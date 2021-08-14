import { ORDER_CREATE, ORDER_CREATE_FAILURE, ORDER_CREATE_SUCCESS, ORDER_DETAILS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_SUCCESS, ORDER_PAY, ORDER_PAY_FAILURE, ORDER_PAY_SUCCESS } from "../constants/OrderConstants";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { CART_EMPTY } from "../constants/CartConstants";

export const createOrder = (order) => async(dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE,
        payload: order
    })
    try {
        const {
            user: { userInfo },
          } = getState();
          const { data } = await Axios.post('/api/orders', order, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
          dispatch({ type: CART_EMPTY });
          localStorage.removeItem('cartItems');

    } catch(err) {
        console.log('incatch');
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: err.response && err.response.data.message ?
            err.response.data.message : err.message
        })
    }
} 

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS,
    payload: orderId
  });
  const {user: {userInfo}} = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch(err) {
      const mssg = err.response && err.response.data.message ?
      err.response.data.message : err.message;
      dispatch({
        type: ORDER_DETAILS_FAILURE,
        payload: mssg
      })
  }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_PAY,
    payload: {
      order,
      paymentResult 
    }
  })
  const {user : {userInfo}} = getState();
  try {
    const { data } = await Axios.put(`/api/orders/${order._id}/pay` ,paymentResult, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch(err) {
    const mssg = err.response && err.response.data.message ?
      err.response.data.message : err.message;
      dispatch({
        type: ORDER_PAY_FAILURE,
        payload: mssg
      })
  }
}
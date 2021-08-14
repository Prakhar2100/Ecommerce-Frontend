import axios from "axios";
import { USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER, USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from "../constants/UserConstants";

export const signin = (email, password) => async(dispatch) => {
    dispatch({
        type: USER_LOGIN,
        payload: {email, password}
    });
    try {
        const { data } = await axios.post('/api/users/signin', {email, password});
        console.log(data);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data   
        })
        localStorage.setItem("userInfo" , JSON.stringify(data)) 
    } 
    catch(err) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: err.response && err.response.data.message ?
            err.response.data.message : err.message
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingDetails');
    dispatch({type: USER_LOGOUT}); 
}

export const register = (name, email, password) => async(dispatch) => {
    dispatch({
        type: USER_REGISTER,
        payload: {name, email, password}
    });
    try {
        const { data } = await axios.post('/api/users/register', {name, email, password});
        console.log(data);
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data   
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data   
        })
        localStorage.setItem("userInfo" , JSON.stringify(data)) 
    } 
    catch(err) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: err.response && err.response.data.message ?
            err.response.data.message : err.message
        })
    }
}
import { USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER, USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from "../constants/UserConstants";

export const userLogin =  (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_LOGIN_FAILURE:
            return {loading: false, error: action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state
    }
}

export const userRegister =  (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}
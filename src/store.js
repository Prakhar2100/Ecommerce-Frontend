import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/CartReducer';
import { itemReducer, itemsReducer } from './reducers/ItemReducer';
import { OrderDetailsReducer, orderPayReducer, orderReducer } from './reducers/OrderReducers';
import { userLogin, userRegister } from './reducers/userReducer';

const initialState = {
    user: {
        userInfo: localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingDetail: localStorage.getItem('shippingDetails') ?  JSON.parse(localStorage.getItem('shippingDetails'))
        : {},
        paymentMethod: 'PayPal',            
    }
};

const reducer = combineReducers({
    itemList: itemsReducer,
    item: itemReducer,
    cart: cartReducer,
    user: userLogin,
    userRegister : userRegister,
    orderCreate: orderReducer, 
    orderDetails: OrderDetailsReducer,
    orderPay: orderPayReducer
}) 

const store = createStore(
    reducer, 
    initialState, 
    compose(applyMiddleware(thunk))
);

export default store;

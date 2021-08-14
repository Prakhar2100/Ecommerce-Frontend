import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/OrderActions';
import { ORDER_CREATE_RESET } from '../constants/OrderConstants';
import StepsBar from './StepsBar';
import Loader from './Loader.js';
import ErrBoxing from './ErrBoxing';

export default function PlaceOrder(props) {
    
    const cart = useSelector((state) => state.cart)
    const { shippingDetail } = cart;
    const { paymentMethod } = cart;
    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.cnt * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    console.log(order);

    const dispatch = useDispatch();
    console.log(shippingDetail);

    if(!paymentMethod) {
        props.history.push('/payment');
    }

    const placeOrderHandler = () => {
        console.log('in place order handler');
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    }

    useEffect(() => {
        if(success) {
            console.log('in success');
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET
            });
        }
    },[success, dispatch, order, props.history, success])

    return(
        <div>
            <StepsBar shoppingstep shippingstep paymentstep orderstep ></StepsBar>
            <div className="row center">
                <div className=" col card card-body">
                    <form className="form" onSubmit={placeOrderHandler}>
                        <div>
                            <h3>Order Summary</h3>
                        </div>
                        <div className = "row">
                            <div className = "col">
                                <p style={{fontSize: '1rem'}}><strong>Name:</strong> {shippingDetail.fullName} </p> 
                                <p style={{fontSize: '1rem'}}><strong>Address:</strong> {shippingDetail.address} </p> 
                                <p style={{fontSize: '1rem'}}><strong>City :</strong> {shippingDetail.city} </p> 
                                <p style={{fontSize: '1rem'}}><strong>Postal Code :</strong> {shippingDetail.postalCode} </p>
                                <p style={{fontSize: '1rem'}}><strong>Country :</strong> {shippingDetail.country } </p> 
                            </div>
                        </div>
                        <div className = "row center">
                            <h4>Order Summary :</h4>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p style={{fontSize: '1rem'}}>Items : ₹{cart.itemsPrice}</p> 
                                <p style={{fontSize: '1rem'}}>Tax : ₹{cart.taxPrice}</p> 
                                <p style={{fontSize: '1rem'}}><strong>Total : ₹{cart.totalPrice}</strong></p> 
                            </div>
                        </div>
                        <div style={{marginTop: '1rem'}} className="row center">
                        <button
                            type="button"
                            onClick={placeOrderHandler}
                            className="primary1 block"
                            disabled={cart.cartItems.length === 0}
                            >
                            Place Order
                        </button>
                        </div>
                        {
                            loading ? <Loader></Loader> : <div></div>
                        }
                        {
                            error ? <ErrBoxing type="danger">{error}</ErrBoxing> : <div></div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
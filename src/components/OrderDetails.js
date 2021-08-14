import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import Loader from './Loader.js';
import ErrBoxing from './ErrBoxing';
import { detailsOrder, payOrder } from '../actions/OrderActions';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/OrderConstants.js';

export default function OrderDetails(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const {loading: loadingPay ,error: errorPay, success: successPay } = orderPay;
    const dispatch = useDispatch();
    console.log(order);

    useEffect(() => {
        const addPayPalScript = async() => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        };
        if(!order || successPay || (order && order._id !== orderId)) {
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch(detailsOrder(orderId));
        } else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
        
    },[dispatch, order, orderId, sdkReady ])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    return loading ? (<Loader />) : 
    error ? (<ErrBoxing type="danger">{error}</ErrBoxing>) :
    (
        <div>
            <div className="row center"> 
                <div className=" col card card-body">
                    <div>
                        <h3>Order {order._id}</h3>
                    </div>
                    <div className = "row"> 
                        <div className = "col">
                            <p style={{fontSize: '1rem'}}><strong>Name : </strong>{order.shippingAddress.fullName}</p> 
                            <p style={{fontSize: '1rem'}}><strong>Address : </strong>{order.shippingAddress.address}</p> 
                            <p style={{fontSize: '1rem'}}><strong>Payment Method : </strong>{order.paymentMethod}</p> 
                            {
                                order.isDelivered? <ErrBoxing type="success">Delivered at {order.deliveredAt}</ErrBoxing>:
                                <ErrBoxing type="danger">Not Delivered</ErrBoxing>
                            }
                        </div>
                    </div>
                    <div className = "row center">
                        <h4>Order Summary :</h4>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p style={{fontSize: '1rem'}}>Items : ₹{order.itemsPrice}</p> 
                            <p style={{fontSize: '1rem'}}>Tax : ₹{order.taxPrice}</p> 
                            <p style={{fontSize: '1rem'}}><strong>Total : ₹{order.totalPrice}</strong></p> 
                            {
                                order.isPaid? <ErrBoxing type="success">Paid at {order.PaidAt}</ErrBoxing>:
                                <ErrBoxing type="danger">Not Paid</ErrBoxing>
                            }
                        </div>
                    </div>
                    {
                        !order.isPaid ? 
                        (<div>
                            {
                                !sdkReady? (<Loader></Loader>) :
                                (  
                                <React.Fragment>
                                    {
                                        errorPay && (<ErrBoxing type="danger">{errorPay}</ErrBoxing>)
                                    }
                                    {
                                        loadingPay && <Loader></Loader>
                                    }
                                        <PayPalButton 
                                            amount={order.totalPrice} 
                                            onSuccess={successPaymentHandler}>
                                        </PayPalButton>
                                </React.Fragment>
                                )
                            }
                        </div>)
                        : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
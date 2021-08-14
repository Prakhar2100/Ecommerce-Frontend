import React, { useState } from 'react';
import StepsBar from './StepsBar';
import { useDispatch, useSelector } from 'react-redux';
import { PromiseProvider } from 'mongoose';
import { savePaymentMethod } from '../actions/CartAction';

export default function PaymentScreen(props) {
    const { shippingDetail } = useSelector((state) => state.cart);
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();

    if(!shippingDetail.address) {
        props.history.push('/shipping');   
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return(
        <div>
            <StepsBar shoppingstep shippingstep paymentstep />
            <div className="row center">
                <div className="col">
                    <img height='245px' width='250px' src='/images/payment.jpg' alt='money' />
                </div>
                <div className=" col card card-body">
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h3>Pay Using</h3>
                        </div>
                        <div>
                            <div className="row center">
                                <input type="radio" 
                                    id="paypal" 
                                    value="Paypal" 
                                    name="paymentMethod"
                                    required checked
                                    onChange = {(e) => setPaymentMethod(e.target.value)}
                                />
                                <label style={{fontSize: '1rem' ,color: 'purple'}} htmlFor="paypal">Paypal </label>
                            </div>
                            <div style={{marginTop: '1rem'}} className="row center">
                                <input type="radio" 
                                    id="gpay" 
                                    value="Gpay" 
                                    name="paymentMethod"
                                    required
                                    onChange = {(e) => setPaymentMethod(e.target.value)}
                                />
                                <label style={{ fontSize: '1rem' ,color: 'blue'}}htmlFor="gpay">G-pay</label>
                            </div>
                            <div style={{marginTop: '1rem'}} className="row center">
                                <button className="primary1" type="submit">Continue</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col">
                    <img height='245px' width='250px' src='/images/payment.jpg' alt='money' />
                </div>
            </div>
        </div>
    )
}
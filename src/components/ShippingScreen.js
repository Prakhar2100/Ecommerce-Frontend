import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDetails } from '../actions/CartAction';
import StepsBar from './StepsBar';

export default function ShippingScreen(props) {

    const { userInfo } = useSelector((state) => state.user);  
    const { shippingDetail } = useSelector((state) => state.cart);

    const [fullName, setFullName] = useState(shippingDetail.fullName);
    const [address, setAddress] = useState(shippingDetail.address);
    const [city, setCity] = useState(shippingDetail.city);
    const [postalCode, setPostalCode] = useState(shippingDetail.postalCode);
    const [country, setCountry] = useState(shippingDetail.country);
    const dispatch = useDispatch();

    

    if(!userInfo) {
        props.history.push('/signin'); 
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(shippingDetails({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
        console.log('reached after /payment');
    }

    return(
        <div>
            <StepsBar shoppingstep shippingstep></StepsBar>
                <div className="row center">
                <div className="card card-body">
                    <div className="row center">
                        <form className="form" onSubmit={submitHandler}>
                            <div>
                                <h2>Shipping Address</h2>
                            </div>
                            <div>
                                <div className="row">
                                    <label className="label" htmlFor="fullName">
                                        <strong style={{color: 'gray'}}>Full Name</strong>
                                    </label><br/>
                                </div>
                                <div className="row">
                                    <input className="input"
                                        type="text" 
                                        id="fullName" 
                                        placeholder="Enter Full Name"  
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="row"> 
                                    <label className="label" htmlFor="address">
                                        <strong style={{color: 'gray'}}>Address</strong>
                                    </label><br />
                                </div>
                                <div className="row center">
                                    <input className="input"
                                        type="text" 
                                        id="address" 
                                        placeholder="Enter Address"  
                                        value={address} 
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <label className="label" htmlFor="city">
                                        <strong style={{color: 'gray'}}>City</strong>   
                                    </label><br />
                                </div>
                                <div className="row center">
                                    <input className="input"
                                        type="text" 
                                        id="city" 
                                        placeholder="Enter City"  
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <label className="label" htmlFor="postalCode">
                                        <strong style={{color: 'gray'}}>Postal Code</strong>
                                    </label><br />
                                </div>
                                <div className="row center">
                                    <input className="input"
                                        type="text" 
                                        id="postalCode" 
                                        placeholder="Enter Postal Code"  
                                        value={postalCode} 
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        required
                                    />
                                        
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <label className="label" htmlFor="country">
                                        <strong style={{color: 'gray'}}>country</strong>
                                    </label><br />
                                </div>
                                <div className="row center">
                                    <input className="input"
                                        type="text" 
                                        id="country" 
                                        placeholder="Enter country"  
                                        value={country} 
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div style={{marginTop: '1rem'}} className="row center">
                                    <label/>
                                    <button className="primary1" type="submit">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
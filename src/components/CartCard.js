import React, { useEffect, useState } from 'react';
import { createSelectorHook, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, RemoveFromCart } from '../actions/CartAction';

export default function CartCard({item}) {
    const dispatch = useDispatch();

    const removeFromCart = () => {
        //calling cartremove action to remove the current item on click
        dispatch(RemoveFromCart(item.item));
    }

    return(
        <div className="row ">    
            <div className="card card-body cart-card">
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-lg-4">
                        <img src={item.image} alt={item.name} height="60px" width="80px"/>
                    </div>
                    <div className="col-12 col-md-5 col-lg-6">
                        <text style={{margin: '1rem', fontSize: '1rem', color: "black"}}>{item.name}</text><br/>
                        <text style={{margin: '1rem', fontSize: '0.6em' ,color: 'blue'}}>₹{item.price}</text>
                    </div>
                    <div>
                        <select style={{padding: "0.2rem" ,marginLeft: "1rem"}} value={item.cnt} onChange={(e) => dispatch(addToCart(item.item,Number(e.target.value)))}>
                        {
                            [...Array(item.stockcnt).keys()].map(
                                (val) => (
                                    <option key={val+1} value={val+1}>{val+1}</option>
                                )
                            )
                        }
                        </select>
                    </div>
                    <div>
                        <button type='button' className="primary2" onClick={() => removeFromCart(item.item)}><span><i className="fa fa-trash"></i></span></button>
                    </div>
                </div> 
            </div>
        </div>
    )
}
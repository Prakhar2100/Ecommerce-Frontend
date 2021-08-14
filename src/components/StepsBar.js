import { PromiseProvider } from 'mongoose';
import React from 'react';

export default function StepsBar(props) {
    return(
        <div className="card">
            <div className="row steps-bar">
                <div className={props.shoppingstep ? 'active':''}>Shopping</div>
                <div className={props.shippingstep ? 'active':''}>Shipping</div>
                <div className={props.paymentstep ? 'active':''}>Payment</div>
                <div className={props.orderstep ? 'active':''}>Place Order</div>
            </div>
        </div>
    )
}


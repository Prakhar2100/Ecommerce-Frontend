import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/CartAction';
import CartCard from './CartCard';
import ErrBoxing from './ErrBoxing';
 
export default function CartScreen(props) {
    const itemId = props.match.params.id;
    const cnt = props.location.search ? Number(props.location.search.split('=')[1]) : 1 ;
    const dispatch = useDispatch();

    useEffect(() => {
        if(itemId) {
            dispatch(addToCart(itemId, cnt));
        }
    },[dispatch, itemId, cnt])
    
    const { cartItems } = useSelector((state) => state.cart);

    const checkOut = () => {
    //history.push works on last in first out (LIFO) stack based concept
    //therefore using this latest pushed path in the history stack is 
    //displayed on screen
        props.history.push('/signin?redirect=shipping')
    };

    return(
        <div>
            {
                cartItems.length === 0 ?
                <ErrBoxing>Cart is Empty <Link style={{color: 'red'}} to='/'>Go Shopping &nbsp; <span><i className='fa fa-shopping-cart'></i></span></Link></ErrBoxing> :
                <div>
                    <Link to={`/item/${itemId}`}>
                        <button style={{borderRadius: "50%", 
                                        fontSize: '2rem', 
                                        color: 'black', 
                                        backgroundColor: 'white'}}
                        >
                            <i className='fa fa-arrow-left  '></i>
                        </button>
                    </Link>
                    <div className="row center">
                        <div>
                            {
                                cartItems.map((item) => {
                                    return <CartCard item = {item}/>
                                })
                            }
                        </div>
                        <div>
                            <div className="card card-body">
                                <h2>
                                    Invoice
                                </h2>
                                <h6>
                                    {/* .reduce() function accepts 2 parameters, a = accumulator, c = item
                                    value from item.cnt is consecutively added to the accumulator which
                                    in turn is returned as a value of SubTotal */}

                                    SubTotal ({cartItems.reduce((a,c) => a+c.cnt, 0)} items) : 
                                    &nbsp; &nbsp; ₹ {cartItems.reduce((a,c) => a+c.price*c.cnt, 0)}<br />
                                    Discount : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;₹0.0 <br/>
                                    Taxes & Charges : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ₹0.0
                                    <hr />
                                    Grand Total : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ₹ {cartItems.reduce((a,c) => a+c.price*c.cnt, 0)}<br />
                                </h6>
                                <br />
                                <button type="button" onClick={checkOut} className="primary1" disabled={cartItems.length === 0}>
                                    <span><i className="fa fa-credit-card"></i></span> Proceed To Payment 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
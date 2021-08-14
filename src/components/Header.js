import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/UserAction';

function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.user);
    console.log(userInfo);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(signout());
    }

    return(
        <header className="row">
            <div>
                <Link className="brand" to="/">
                    Ecommerce
                </Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {
                    cartItems.length > 0 ? 
                    <span className="badge">{cartItems.length}</span> :
                    <span></span>
                }
                </Link>
                {
                    userInfo ?
                    (
                        <div className="dropdown">
                            <Link to="/">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <Link to="/signin" onClick={logoutHandler}>Logout</Link>
                            </ul>
                        </div>
                    ) 
                    :
                     <Link to="/signin">Login</Link> 
                }
                
            </div>
      </header>
    )
}

export default Header;
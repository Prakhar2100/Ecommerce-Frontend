import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/UserAction';
import ErrBoxing from './ErrBoxing';
import Loader from './Loader';

export default function SigninScreen(props) {

    var userPlace = <span><i className="fa fa-shopping-cart"></i> Type your Username</span>
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    //defines the screen to which user has to be redirected after login
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';
    const { userInfo, loading, error } = useSelector((state) => state.user);

    const submitHandler = (e) => {
        //using this when user click on signin button this form will 
        //not refresh and the values will be preserved
        console.log("inSubmitHandler");
        e.preventDefault();
        dispatch(signin(email, password))   
    };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect])

    return (
        <div className="row center">
            <div className="card card-body extend">
                <div className="row">
                    <form className="form" onSubmit={submitHandler}>
                        <div className="row center">
                            <h3 style={{marginLeft: '4rem'}}>Login</h3>
                        </div>
                        {
                            loading ? <Loader /> : <div></div> 
                        }
                        {
                            error ? <ErrBoxing type ="danger">{error}</ErrBoxing> : <div></div>
                        }
                        <div>
                            <div>
                                <label className="label" htmlFor="email">
                                    <strong style={{color: 'gray'}}>Username</strong>
                                </label><br/>
                                <input className="input" type="text" id="email" placeholder='Type your Username' required
                                    onChange = {e => setEmail(e.target.value)}
                                >
                                </input>     
                            </div>
                            <div>
                                <label className="label" htmlFor="password">
                                    <strong style={{color: 'gray'}}>Password</strong>
                                </label><br />
                                <input className="input" type="password" id="password" placeholder="Type your Password" required
                                    onChange = {e => setPassword(e.target.value)}
                                >
                                </input>
                            </div>
                            <div>
                                <label />
                                <button className="primary3" type="submit">Login</button>
                            </div>
                            <div>
                                <label />
                                <div className="row center" style={{marginLeft: '2rem' ,marginTop: '1rem', fontSize: '1rem'}}>
                                    New User? &nbsp;
                                    <Link style={{color: 'gray', fontWeight: 'bold'}} to={`/register?redirect=${redirect}`}>Register</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
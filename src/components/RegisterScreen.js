import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/UserAction';
import ErrBoxing from './ErrBoxing';
import Loader from './Loader';

export default function RegisterScreen(props) {

    var userPlace = <span><i className="fa fa-shopping-cart"></i> Type your Username</span>
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    //defines the screen to which user has to be redirected after login
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';
    const { userInfo, loading, error } = useSelector((state) => state.userRegister);

    const submitHandler = (e) => {
        //using this when user click on signin button this form will 
        //not refresh and the values will be preserved
        console.log("inSubmitHandler"); 
        e.preventDefault();
        if(password !== ConfirmPassword) {
            alert("Password and Confirm Password doesn't match")
        } else
            dispatch(register(name, email, password));  
    };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect])

    return (
        <div className="row center">
            <div style={{width: '20rem'}} className="card card-body extend">
                <div className="row">
                    <form className="form" onSubmit={submitHandler}>
                        <div className="row center">
                            <h3 style={{marginLeft: '4rem'}}>Register</h3>
                        </div>
                        {
                            loading ? <Loader /> : <div></div> 
                        }
                        {
                            error ? <ErrBoxing type ="danger">{error}</ErrBoxing> : <div></div>
                        }   
                        <div>
                            <div>
                                <label className="label" htmlFor="name">
                                    <strong style={{color: 'gray'}}>Name</strong>
                                </label><br/>
                                <input className="input" type="text" id="name" placeholder='Type your Name' required
                                    onChange = {e => setName(e.target.value)}
                                >
                                </input>     
                            </div>
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
                                <label className="label" htmlFor="confirmPassword">
                                    <strong style={{color: 'gray'}}>Confirm Password</strong>
                                </label><br />
                                <input className="input" type="confirmPassword" id="confirmPassword" placeholder="Confirm your Password" required
                                    onChange = {e => setConfirmPassword(e.target.value)}
                                >
                                </input>
                            </div>
                            <div>
                                <label />
                                <button className="primary3" type="submit">Register</button>
                            </div>
                            <div>
                                <label />
                                <div className="row center" style={{marginLeft: '2rem' ,marginTop: '1rem', fontSize: '1rem'}}>
                                    Have an Account ? &nbsp;
                                    <Link style={{color: 'gray', fontWeight: 'bold'}} to={`/signin?redirect=${redirect}`}>Login</Link>
                                </div>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
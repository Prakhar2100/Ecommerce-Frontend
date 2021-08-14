import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemlist } from '../actions/ItemAction';
import ErrBoxing from './ErrBoxing';
import Loader from './Loader';
import Rating from './Rating';

function ItemScreen(props) {
    const itemdetail = useSelector((state) => state.item);
    const itemId = props.match.params.id;
    const { loading, item, error} = itemdetail;
    const dispatch = useDispatch();
    const [cnt, setCnt] = useState(1);

    useEffect(() => {
        dispatch(itemlist(itemId));
    }, [dispatch])

    const addToCartHandler = () => {
        props.history.push(`/cart/${item._id}?cnt=${cnt}`)
    }

    return(
        <div>
        {   loading ? <Loader /> :
            error ? <ErrBoxing type="danger">{error}</ErrBoxing> :
            <div>
                <Link to='/'>
                    <button style={{borderRadius: "50%", 
                                    fontSize: '2rem', 
                                    color: 'black', 
                                    backgroundColor: 'white'}}
                    >
                        <i className='fa fa-arrow-left  '></i>
                    </button>
                </Link>
                <div className="row center">    
                    <div className="card card-body">
                        <div className="row center">
                            <div className="col-sm-12 col-md-3 col-lg-4">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="col-12 col-md-5 col-lg-6 card-body">
                                <h5 style={{color: "black"}}>{item.name}</h5>
                                <text style={{fontWeight: 'bold', fontSize: '1.2rem' ,color: "blue"}}>{item.brand}</text>
                                &nbsp; &nbsp;<span style={{fontSize: '0.7em'}}><i className='fa fa-eye fa' style={{color: '#abbbbb'}}></i></span>
                                <text style={{fontSize: '0.6em' ,color: '#b8b894'}}>{item.reviews}</text>
                                <Rating rating={item.rating}/>
                                
                            </div>
                        </div> 
                        <p style={{fontSize: '1rem'}}><strong>Price:</strong> <text style={{marginLeft: '11rem'}}>₹{item.price}</text></p>
                        <p style={{fontSize: '1rem'}}><strong>Description:</strong> <text style={{marginLeft: '8rem'}}>{item.description}</text></p>
                        <p style={{fontSize: '1rem'}}><strong>Status:</strong> 
                            {item.stockcnt === 0 ? <span style={{marginLeft: '10.5rem', color: 'red'}}> Currently Unavailable</span> :
                                <span style={{marginLeft: '10.5rem', color: 'green'}}> In Stock</span>    
                            }
                        </p>
                        {
                            item.stockcnt > 0 ?
                            <div>
                                <button onClick={addToCartHandler} className="primary">
                                    <span><i className='fa fa-shopping-cart'></i></span> &nbsp; Add To Cart
                                </button>
                                <select style={{padding: "0.2rem" ,marginLeft: "1rem"}} value={cnt} onChange={(e) => setCnt(e.target.value)}>
                                {
                                    [...Array(item.stockcnt).keys()].map(
                                        (val) => (
                                            <option key={val+1} value={val+1}>{val+1}</option>
                                        )
                                    )
                                }
                                </select>
                            </div> 
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default ItemScreen;
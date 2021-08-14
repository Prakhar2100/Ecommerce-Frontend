import React from 'react';
import { Link } from 'react-router-dom';
import Rating  from './Rating';

function Card({item}) {
    return(
        <div key={item._id} className="card">
            <Link className= "center" to={`/item/${item._id}`}>
                <img height="180" width="280" src={item.image} alt={item.name} />
            </Link>
            <div className="card-body">
                <Link to={`/item/${item._id}`}>
                    <h5 style={{color: "black"}}>{item.name}</h5>
                </Link>
                <span style={{fontSize: '0.9em'}}><i className='fa fa-eye fa' style={{color: '#abbbbb'}}></i></span>
                &nbsp; <text style={{fontSize: '0.7em' ,color: '#b8b894'}}>{item.reviews}</text>
                <Rating rating={item.rating}/>
                <div className="price">₹{item.price}</div>
            </div>
        </div>
    )
}

export default Card;
import React, { useEffect} from 'react';
import Card from './Card';
import Loader from './Loader';
import ErrBoxing from './ErrBoxing';
import { useDispatch, useSelector } from 'react-redux';
import { itemslist } from '../actions/ItemAction';

function HomeScreen() {
    const dispatch = useDispatch();
    const itemList = useSelector((state) => state.itemList);
    const {loading, items, error} = itemList;

    useEffect(() => {
        dispatch(itemslist());
    },[dispatch])

    return(
        <div>
        {   loading ? <Loader /> :
            error ? <ErrBoxing type="danger">{error}</ErrBoxing> :
            <div className="row center">
                {items.map((item) => (
                    <Card item={item}/>
                ))}
            </div>
        }
        </div>
    )
}

export default HomeScreen;
import React from 'react';

function ErrBoxing(props) {
    return(
            <div style={{fontSize: '0.8rem'}} className={`alert alert-${props.type || 'info'}`}>
                {props.children}
            </div>
    )
}

export default ErrBoxing;
import React from 'react';

//Particular CSS
import './Item.css';

//Routing
import { Link } from 'react-router-dom';


const Item = ({ id, name, price, pictureUrl }) => {

    return (
        <Link to={`/item/${id}`} >
            <div className="card-container">
                <div className="img-container">
                    <img src={pictureUrl} alt=""/>
                </div>
                <div className="info-container">
                    <p className='title truncate'>{name}</p>
                    <p className='price'>${price}</p>
                </div>
            </div>
        </Link>
    )
}

export default Item

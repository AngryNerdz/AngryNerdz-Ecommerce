import React from 'react';

//Css particular
import './CartItem.css'

const CartItem = ({item, quantity, price, img , deleteItem }) => {

    return (
        <>
            <div className="cart-item ">
                <i onClick={ ()=> deleteItem(item) } className="material-icons delete-item item" >cancel</i>
                <div  className="item-img item" style={{backgroundImage: `url(${img})`}}>
                </div>
                <div className="item-name item">
                    {item}
                </div>
                <div className="item-quantity item">
                    {quantity}
                </div>
                <div className="item-value item">
                    $ {price}
                </div>
                <div className="item-totalValue item">
                    $ {quantity * price}
                </div> 
            </div>
            <hr/> 
        </>
    )
}

export default CartItem

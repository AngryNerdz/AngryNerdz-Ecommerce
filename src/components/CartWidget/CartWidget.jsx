import React,{useContext} from 'react';

//Routing
import { Link } from 'react-router-dom';

//Context
import {CartContext} from '../../context/cartContext';

//Particular CSS
import './CartWidget.css';


const CartWidget = () => {

    const { items }= useContext(CartContext);

    return (
        <>  
            <div className = "cartwidget-container" >
                {
                    items > 0 
                    && 
                    <div className="total-items">
                        <p>{items}</p>
                    </div>
                }
                <Link to="/cart" > <i className="material-icons">shopping_cart</i> </Link>
            </div>
        </>
    )

}

export default CartWidget

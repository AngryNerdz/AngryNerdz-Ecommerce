import React from 'react';

//Components
import CartWidget from "../CartWidget/CartWidget";

//Particular Css
import './NavBar.css';

//Routing
import {NavLink} from 'react-router-dom'


const NavBar = () => {

    return (
        <>  
            <nav id='nav'>
                <div className="nav-wrapper">
                    {/* El atributo exact hace que el router busque exactamente la ruta / y no todas las q empiezen con / */}
                    <NavLink to="/" exact className="brand-logo">AngryNerdz</NavLink>
                    <a href="/#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <NavLink to="/categories/computacion" className="navlink"> Computación </NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories/gaming" className="navlink"> Gaming </NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-orders" className="navlink " > Mis compras </NavLink>
                        </li>
                    </ul>
                    {/* Icono de carrito de compras */}
                    <CartWidget />
                </div>
            </nav>
            {/* Mismo menu pero cuando esta colapsado para mobile */}
            <ul className="sidenav sidenav-close" id="mobile-demo" >
                <li>
                    <NavLink to="/categories/computacion" className="navlink"> Computación </NavLink>
                </li>
                <li>
                    <NavLink to="/categories/gaming" className="navlink"> Gaming </NavLink>
                </li>
                <li>
                    <NavLink to="/my-orders" className=" navlink " > Mis compras </NavLink>
                </li>
            </ul>
        </>
    )
};

export default NavBar;

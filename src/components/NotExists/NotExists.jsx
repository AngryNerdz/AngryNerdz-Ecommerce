import React from 'react';

//Icon Component
import { BiCommentError } from 'react-icons/bi';

//Routing
import { Link } from 'react-router-dom';

//Particular Css
import './NotExists.css';

const NotExists = ({title}) => {
    return (
        <>
            <div className="not-exist-item">
                <BiCommentError className="coment-error"/>
                <h4>{title}</h4>
                <Link to="/"><button className="waves-effect waves-light btn backToLanding-btn">Volver a la tienda</button></Link> 
            </div>
        </>
    )
}

export default NotExists

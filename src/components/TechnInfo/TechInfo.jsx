import React from 'react';

//Css particular
import './TechInfo.css';

const TechInfo = ({item}) => {
    return (

        <div className="details-container">
            <ul>
                {
                    item.details !== undefined 
                    &&
                    Object.entries(item.details).map( ([key,value]) =>

                        <li key={key}>{key.toUpperCase()}<span className="span">{ value }</span></li> 
                    )
                }
            </ul>
        </div>
    )
}

export default TechInfo

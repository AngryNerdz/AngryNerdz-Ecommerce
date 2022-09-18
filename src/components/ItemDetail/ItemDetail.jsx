import React, { useState } from 'react';

//Particular CSS
import './ItemDetail.css';

//Components
import ItemCount from '../ItemCount/ItemCount';
import FinishBuying from '../FinishBuying/FinishBuying';
import TechInfo from '../TechnInfo/TechInfo';


const ItemDetail = ({item}) => {


    const [ bigImg, setBigImg ] = useState('');
    const [ isAdded, setIsAdded ] = useState(false);


    return (
        <div className="item-detail">
            <div className="container-one">
                <div className="img-counter-container">
                    <div className="small-images-big-image-container">
                        <div className="small-images">
                            <div className="sm-img" 
                                style={{ 
                                    backgroundImage: `url(${item.pictureUrl[0]})` 
                                }}
                                onMouseOver={ () => setBigImg({backgroundImage: `url(${item.pictureUrl[0] })`})}
                            >
                            </div>
                            <div className="sm-img" 
                                style={{
                                    backgroundImage: `url(${ item.pictureUrl[1] !== undefined ? item.pictureUrl[1] : item.pictureUrl[0] })` 
                                }}
                                onMouseOver={ () => setBigImg({backgroundImage: `url(${item.pictureUrl[1] !== undefined ? item.pictureUrl[1] : item.pictureUrl[0] })`})}
                            >
                            </div>
                            <div className="sm-img" 
                                style={{
                                    backgroundImage: `url(${item.pictureUrl[2] !== undefined ? item.pictureUrl[2] : item.pictureUrl[0] })`,
                                }}
                                onMouseOver={ () =>{
                                    setBigImg({backgroundImage: `url(${item.pictureUrl[2] !== undefined ? item.pictureUrl[2] : item.pictureUrl[0] })`});
                                }}
                            >
                            </div>
                        </div>
                        <div className="big-image" 
                            style={bigImg !== '' ? bigImg : { backgroundImage: `url(${item?.pictureUrl[0] })`} }
                            >      
                        </div>
                    </div>
                    <ItemCount isAdded={isAdded} setIsAdded={setIsAdded} initial={item.initial} stock={item.stock} item={item} /> 
                    {
                        isAdded 
                            && 
                        <FinishBuying/>
                    } 
                </div>
            </div>
            <div className="container-two">
                <div className="title-price">
 
                    <h4 className="item-name">{item.name}</h4>
                    <h4>${item.price}</h4>
                    <p>STOCK: {item.stock}</p>
                    <small>COD: { item.id.slice(0,6)}</small>
                    <h6>{item.description}</h6>
                </div>
                {/* Solo renderizo el detalle tecnico si es que existe
                    Algunos productos no cuentan con detalle tecnico pero si con una descripción */}
                {
                    item.details !== undefined && <TechInfo item={item} />
                }
                
            </div>
        </div>
    ) 
        


}

export default ItemDetail

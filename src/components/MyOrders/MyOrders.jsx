import React,{useContext, useState, useEffect} from 'react';

//Luxon
import { DateTime } from 'luxon';

//Context
import {CartContext} from '../../context/cartContext';

//Firestore
import { getFirestore } from '../../firebase/firebaseConfig';

//Components
import Loader from '../Loader/Loader';

//Css particular
import './MyOrders.css';

const MyOrders = () => {

    const { orderIds ,setOrderIds } = useContext(CartContext);

    const [ ordersInfo, setOrdersInfo ] = useState([]);
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {

        let isMounted = true;

        const db = getFirestore();

        // En "getOrders", "itemRefs" devuelve una promesa del documento especifico por cada id de compra que hay en el array de ids "orderIds".
        // Luego voy a esperar que se resuelvan todas esas promesas con un Promise.All y ahi si llamar a setOrdersInfo para guardar la informacion.
        if (isMounted) {
            const getOrders = (orderIds, setOrdersInfo) => {

                let itemRefs = orderIds.map( ({id}) => {
                    return db.collection('orders').doc(id).get();
                });
        
                Promise.all(itemRefs)
                .then(docs => {
        
                    let items = docs.map(doc => ({id: doc.id, ...doc.data() } ) );
                    //Reverse para que la ultima compra figure arriba
                    setOrdersInfo(items.reverse())
                })
                .catch(e => console.log(e))
                .finally(()=>{
                    setLoading(false)
                })
        
            };
            getOrders( orderIds, setOrdersInfo);

            return () => {
                isMounted = false; 
            };
        }


    }, [orderIds]);

    const time = (seconds)=> {

        return  DateTime.fromSeconds(seconds)
    }

    if(loading) {
        return(
            <Loader/>
        )
    } else {
        return (

            <div className="orders-container">
                <div className="orders-organizer">
                    <h3 className="title">Mis compras</h3>
    
                    <button 
                        className="waves-effect  waves-light btn"
                        onClick={()=> {
                            localStorage.removeItem('my-orders');
                            setOrderIds([])
                        }}>
                        Borrar historial
                    </button>
    
                    <div className="orders-columns">
                        <p>Fecha</p>
                        <p>Productos</p>
                        <p>Codigo de pedido</p>
                        <p>Total</p>
                    </div>
                    <div className="orders">
                        {   
                            ordersInfo.length > 0 && (
    
                                ordersInfo.map( ({ id, total, date, items }) =>
    
                                    <div className="order-row" key={id}>
                                        <div className="order-info date" >
                                            {   
                                                date &&
                                                `${time(date.seconds).c.day}/${time(date.seconds).c.month}/${time(date.seconds).c.year} 
                                                ${time(date.seconds).c.hour}:${time(date.seconds).c.minute} `
                                            }                           
                                        </div>
                                        <div className="order-info items">
                                            <ul>
                                            {
                                                items &&
                                                items.map(item => <li className="truncate" key={item.id}> {item.qty} x {item.item} </li> )
                                            }
                                            </ul>
                                        </div>
                                        <div className="order-info id "> { id } </div>
                                        <div className="order-info total"> ${ total } </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default MyOrders

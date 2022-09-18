import React,{useContext,useState, useEffect} from 'react';

// Import firebase para usar la libreria de timestamp
import firebase from 'firebase/app';
import '@firebase/firestore';

//Librerias
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Components
import NotExists from '../NotExists/NotExists';

//Firestore
import { getFirestore } from '../../firebase/firebaseConfig';

//Context
import {CartContext} from '../../context/cartContext';

//History
import { useHistory } from "react-router-dom";

//Hook-Form
import { useForm } from 'react-hook-form';

//Css particular
import './BuyingForm.css';

const BuyingForm = () => {

    const { cart, setCart, total, orderIds, setOrderIds, itemsInLocal } = useContext(CartContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const email = watch("email");
    const confirmEmail = watch("confirmEmail");

    const [passErr, setPassErr] = useState(false);
 
    const [ error, setError ] = useState(false);
    
    const [loading, setLoading] = useState(false);
    //Este state controla que se haya generado una id de compra
    const [newId, setNewId] = useState();

    let history = useHistory();

    //Si el carrito no esta vacio entonces mando notificacion motivacional
    //De lo contrario redirigo al usuario a la home page
    
    useEffect(() =>{
        if (cart.length !== 0){
            motivationNotif()
        } 
        
        
    }, [cart,history]);


    const motivationNotif = () => {toast('Estas a solo un paso!! Completa los datos para coordinar la entrega del producto!!', {
        position: "bottom-left",
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    const purchaseNotif = () => {toast('Compra realizada con exito!!El codigo de pedido resaltado es el mas reciente', {
        position: "bottom-left",
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    toast.configure();
    
    //Funcion para actualizr los stocks en firestore de los productos recien comprados
    const updateStocks = () => {

        const db = getFirestore()
        const itemCollection =  db.collection('items');
        const bache = db.batch()

        cart.forEach( item => {

            bache.update(itemCollection.doc(item.id),{stock: item.stock - item.quantity})
        })

        bache
        .commit()
        .then(()=> {
            console.log("Bache ok")
        })
        .catch(e => console.log(e))

    }

    const handleOrder = (data)=> {

        if (data) {

            let order = 
            {
                buyer: {
                    name: `${data.name} ${data.lastname}`,
                    phone: data.telephone,
                    email: data.email
                },
                items: cart.map(item => ({
                    id: item.id,
                    item: item.item,
                    price: item.price,
                    qty: item.quantity
                })),
                date:  firebase.firestore.Timestamp.fromDate( new Date()) ,
                total: total
            };

            setLoading(true);
            localStorage.removeItem('cart');
            setCart( itemsInLocal );
            
            const db = getFirestore();
            const ordersCollection = db.collection("orders");

            ordersCollection
            .add(order)
            .then( ({ id }) =>{
                setOrderIds( [ ...orderIds, { id }] );
                setNewId(id);
            })
            .catch(err => {
                setError(err);
            })
            .finally(()=>{
                
                updateStocks();
                purchaseNotif();
                newId !== '' && history.push("/my-orders");
            })
        }
    };


    return (

        cart.length === 0  && loading === false ? (

            <NotExists title={"Sigue mirando nuestro productos!!"}/>
        ): (
            
                <div className="buy-form-container">

                <form onSubmit={handleSubmit(handleOrder)} className="form-container" >

                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            name="name" 
                            id="name" 
                            type="text" 
                            className="validate" 
                            autoComplete="none" 
                            ref={register({
                                required: "Ingresar nombre", minLength: {value:2, message:"Minimo 2 caracteres"}, maxLength: {value:12, message:"Maximo 12 caracteres"}
                            })}
                            />
                        <label htmlFor="name" >Nombre</label>
                        { errors.name && <small>{ errors.name.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            name="lastname" 
                            id="lastname" 
                            type="text" 
                            className="validate" 
                            autoComplete="none" 
                            ref={register({
                                required: "Ingresar apellido", minLength: {value:2, message:"Minimo 2 caracteres"}, maxLength: {value:12, message:"Maximo 12 caracteres"}
                            })}
                        />
                        <label htmlFor="lastname" >Apellido</label>
                        { errors.lastname && <small>{ errors.lastname.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">phone</i>
                        <input 
                            name="telephone" 
                            id="telephone" 
                            type="tel" 
                            className="validate"
                            autoComplete="none" 
                            ref={register({
                                required: "Ingrese su numero", pattern: {
                                    value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, message:"Ingrese un numero valido"
                                } 
                            })}
                        />
                        <label htmlFor="telephone">Telefono/Celular</label>
                        { errors.telephone && <small>{ errors.telephone.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            name="email" 
                            id="email" 
                            type="email" 
                            className="validate" 
                            autoComplete="none"
                            ref={register({
                                required: "Ingrese un email", pattern:{ 
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Ingrese un email valido"
                                } 
                            })} 
                        />
                        <label htmlFor="email">Email</label>
                        { errors.email && <small>{ errors.email.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            name="confirmEmail" 
                            id="confirmEmail" 
                            type="email" 
                            className="validate" 
                            autoComplete="none"
                            ref={register({
                                required: "Ingrese un email", pattern:{ 
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Ingrese un email valido"
                                } 
                            })} 
                            onBlur = { ()=> confirmEmail !== email ? setPassErr(true) : setPassErr(false)}
                            onChange = { ()=> confirmEmail === email && setPassErr(false) }
                        />
                        <label htmlFor="confirmEmail">Confirmar Email</label>
                        { passErr && <small>{ "Sus emails son diferentes"}</small> }
                    </div>

                    {/* Unica forma de que los autocomplete "none" funcionen fue agregando autoComplete = "none" a todos los inputs
                    y crear un ultimo input innecesario (display: none) con autoComplete='on' */}
                    <div className="input-field" style={{display: 'none'}}>
                        <i className="material-icons prefix">email</i>
                        <input id="asd" type="email" className="validate" autoComplete="on"/>
                        <label htmlFor="asd">Email</label>
                    </div>
                    {/* Fin de input innecesario :D */}

                    <h5 className="total-amount">
                        Subtotal &nbsp; ${ total }
                    </h5>
                    <span></span>
                    {error && <p>{error}</p> }


                    {
                        loading ? (
                            <button className="waves-effect btn btn-getOrder ">
                                <div className="loop">
                                    <i className="material-icons">loop </i>
                                </div>
                            </button>
                        ) : (
                            <button disabled={ confirmEmail !== email } type="submit" className= "waves-effect btn btn-buy ">
                                Finalizar compra
                            </button>
                        )
                    }

                </form>
            </div>
        )


    )
}

export default BuyingForm

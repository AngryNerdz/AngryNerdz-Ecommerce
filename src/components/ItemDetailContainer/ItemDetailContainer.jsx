import React, { useEffect, useState} from 'react'

//Components
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import NotExists from '../NotExists/NotExists';

//Hooks
import {useParams} from 'react-router-dom';

//Firestore
import { getFirestore } from '../../firebase/firebaseConfig';


const ItemDetailContainer = () => {

    const [item, setItem ] = useState([]);
    const [loading, setLoading ] = useState(true);

    const {id} = useParams();//Utilizo el id de la ruta actual para saber que componente buscar y mostrar su detalle


    useEffect(() => {

        const db = getFirestore();

        const itemCollection = db.collection('items');
        const item = itemCollection.doc(id);
        
        item.get().then( doc => {

            if(!doc.exists){
                setItem("not exist")
                return;
            }
            
            setItem({ id: doc.id, ...doc.data() });
            
        })
        .catch(error => console.log(error))
        .finally(()=> {
            setLoading(false)
        })

    }, [id]);

    if(loading) {
        return (
            <Loader/>
        )
    } else if(item === "not exist"){
        return(
            <NotExists title={"Ooops!!! La página o producto que estas buscando no existe."}/>
        )
    } else {
        return(
            <ItemDetail item={item} /> 
        )
    }
}

export default ItemDetailContainer;

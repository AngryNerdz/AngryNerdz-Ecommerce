//Hooks
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

//Components
import ItemList from '../ItemList/ItemList'
import Loader from '../Loader/Loader';

//Firestore
import { getFirestore } from '../../firebase/firebaseConfig';

//Particular CSS
import './ItemListContainer.css'


const ItemListContainer = () => {

    const {categoryId} = useParams();//Categoria definida en ruta para saber que productos filtrar

    const [items, setItems] = useState([]);
    

    useEffect(() => {

        let isMounted = true;

        const db = getFirestore();
        const itemCollection = db.collection("items");

        itemCollection.get().then(( querySnapshot ) => {

            if(isMounted){

                if(querySnapshot.size === 0 ) {
                    console.log('No results!')
                }
    
                const documents = querySnapshot.docs.map( doc => ( {id: doc.id, ...doc.data()} ) )
                setItems( documents ) ;
            }
        })
        .catch(err => {
            console.log('Error searching items', err );
        });

        return () => {
            isMounted = false; 
        };

    },[]);



    if (items.length > 0){

        if(categoryId !== undefined){
            return(

                <div className="item-list-container">  
                {
                    <ItemList items={ items.filter(product => product.category === `${categoryId}`) } />
                }  
                </div>
            ) 
        }else{
            return(
                <div className="item-list-container ">    
                    <ItemList items={items} />
                </div>
            )
        }
    }else{
        return(
            <Loader/>
        )
    }
    
}

export default ItemListContainer;

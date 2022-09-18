import React,{useState,createContext,useEffect} from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {

    const itemsInLocal = () => {

        if (localStorage.getItem('cart') !== null) {

            return JSON.parse(localStorage.getItem('cart'))
        }else {
            return [];
        }
    };
    const ordersInLocal = () => {

        if (localStorage.getItem('my-orders') !== null) {

            return JSON.parse(localStorage.getItem('my-orders'))
        }else {
            return [];
        }
    };

    const [cart,setCart] = useState(  itemsInLocal  );
    const [items,setItems] = useState(0);
    const [total,setTotal] = useState(0);
    const [orderIds, setOrderIds] = useState(ordersInLocal);
 
    useEffect(() => {

        updateItems();
        localStorage.setItem('cart',JSON.stringify(cart));
        localStorage.setItem('my-orders',JSON.stringify(orderIds));
        getTotal();
        
    });


    const addToCart = (obj) => {

        // Primero busco si ya existe dentro del array del state Cart un objeto que tenga
        // el mismo nombre que el que quiero agregar al carrito, si no existe ahi si lo agrego.
        const duplicate = cart.find(product => product.item === obj.item);

        if(duplicate !== undefined){
            
            const indexOfDuplicate = cart.findIndex(product => product.item === obj.item);
            
            cart.splice(indexOfDuplicate, 1,
                {
                    item : obj.item,
                    quantity: obj.quantity + duplicate.quantity,
                    price: obj.price,
                    img: obj.img,
                    id: obj.id,
                    stock: obj.stock

                }
            );
        
        }else{
            setCart([
                ...cart,
                {
                    item : obj.item,
                    quantity: obj.quantity,
                    price: obj.price,
                    img: obj.img,
                    id: obj.id,
                    stock: obj.stock
                }
            ]);
        }
    };

    const isInCart = (itemName)=> {
        const isIn = cart.find(product => product.item === itemName);

        return isIn;
    };

    const updateItems = ()=>{
        let total = cart.reduce(( acc,item ) => acc  + item.quantity, 0);
        setItems(total);
    };
    
    const getTotal = () => {
        const sumalize = cart.reduce( (acc, prod) => acc + prod.price * prod.quantity, 0 );
        setTotal(sumalize);
    };
    
    const deleteItem = (itemName)=> {
        
        const editedItems = cart.filter(product => product.item !== itemName );
        setCart(editedItems);
        localStorage.setItem('cart',JSON.stringify(editedItems));
    };
    
    return(
        <CartContext.Provider value={{
            addToCart, 
            isInCart, 
            cart, 
            setCart,
            items ,
            updateItems,
            total, 
            deleteItem,
            orderIds,
            setOrderIds,
            itemsInLocal, 
            ordersInLocal 
            }}>
            {children}
        </CartContext.Provider>
    )
}





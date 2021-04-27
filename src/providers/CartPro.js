import React, { useState, useEffect, useContext } from 'react';
import {CartContext, getData, putData} from '../utils/Util';

const CartPro = (props) => {
    const [cartItems, setcartItems] = useState([]);
    const [totalCard, settotalCard] = useState(0);
    let storedData = getData('cart_items');

    useEffect(()=>{
      setcartItems(storedData)
    }, [])

    useEffect(()=>{
        settotalCard(cartItems.reduce((total, item)=>total+(item.quantity*item.price), 0))
        putData(cartItems, 'cart_items')
    }, [cartItems])

    function addToCart(product) {
        let cartItemDup = [...cartItems];
        let is_exist = 0;
        let pItem;
        if (cartItemDup.length > 0) {
          cartItemDup.forEach(item=> {
            if (item.id === product.id) {
               is_exist = 1
               pItem = item;
               return;
            }
          })
        }
        if (is_exist === 1) {
          pItem.quantity = pItem.quantity + 1
        } else {
          pItem = {...product};
          pItem.quantity = 1;
          cartItemDup.push(pItem);
        }
        setcartItems(cartItemDup);
    }
    function deleteAcartItem(product) {
        if (cartItems.length > 0) {
          setcartItems(cartItems.filter(item=>item.id!==product.id))
        }
    }
  
    function deleteAllItem() {
        setcartItems([]);
    }

    return ( <CartContext.Provider value={{
        cartItems,
        totalCard,
        addToCart,
        deleteAcartItem,
        deleteAllItem

    }}>
          {props.children}
    </CartContext.Provider> );
}
 
export default CartPro;
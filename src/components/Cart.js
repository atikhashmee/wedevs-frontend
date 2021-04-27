import React, { useContext } from 'react';
import {CartContext, AppContext} from '../utils/Util';


const Cart = () => {
    const {cartItems, totalCard, deleteAllItem, deleteAcartItem }  = useContext(CartContext);
    const {auth} = useContext(AppContext)
    let checkoutUrl = auth.auth_token === "" ? '/login' : '/checkout'
    return (  <div className="card text-dark bg-light mb-3" style={{maxWidth : '18rem'}}>
    <div className="card-header text-center">
      <h4>Cart ({cartItems.length}) </h4>
    </div>
    <div className="card-body p-0">
      {cartItems.length >  0 && cartItems.map((item,ind)=>( <div className="each_item" key={ind}>
        <h5 className="card-title">{item.name}</h5>
        <div className="card-text d-flex justify-content-between">
          <div className="input-group mb-3" style={{flexBasis : '50%'}}>
            <input type="number" onChange={(obj)=>{}} value={item.quantity} className="form-control" />
            <span className="input-group-text" id="basic-addon2">${item.price}</span>
          </div>
          <div>
            <span> ${item.quantity * item.price}</span>
          </div>
        </div>
          <div className="closeButton" onClick={()=>{deleteAcartItem(item)}}> <span>x</span> </div>
      </div>))}
      {cartItems.length ===0 && <div className="d-flex flex-column justify-content-center align-items-center help-center">
            <p>Learn to place Order</p>
            <p> <a href="#">Learn more</a> </p>
        </div>}
    </div>
  <div className="card-footer">
    <div className="d-flex justify-content-between">
      <p>Total ${totalCard}</p>
      <button type="button" onClick={()=>{window.location.href=checkoutUrl}} className="btn btn-block btn-primary">Checkout</button>
    </div>
    <div className="text-center">
      <a  href="#" onClick={()=>{deleteAllItem()}}>Clear all item</a>
    </div>
  </div>
</div> );
}
 
export default Cart;
import React, {useEffect, useState} from 'react'
import Product from './components/Product'
let baseUrl = process.env.REACT_APP_.BASE_URL;
function Home() {
    const [products, setproducts] = useState([]);
    const [cartItems, setcartItems] = useState([]);
    const [totalCard, settotalCard] = useState(0);
    useEffect(()=>{
      getProduct();
    }, [])
    function getProduct() {
        fetch(baseUrl+'products/index')
        .then(res=>res.json())
        .then(res=>{
          if (res.status) {
             setproducts(res.data);
          }
        })
    }


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
          console.log('comes here')
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

    useEffect(()=>{
      settotalCard(cartItems.reduce((total, item)=>total+(item.quantity*item.price), 0))
    }, [cartItems])



    return (<div className="row gx-0 gy-0">
        <div className="col-md-9">
          <div className="row">
            {products.length> 0 &&  products.map((item, index)=>(
              <div className="col-md-4" key={index}>
                <Product  product={item} addToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
            <div className="card text-dark bg-light mb-3" style={{maxWidth : '18rem'}}>
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
                  <button className="btn btn-block btn-primary">Checkout</button>
                </div>
                <div className="text-center">
                  <a  href="#" onClick={()=>{deleteAllItem()}}>Clear all item</a>
                </div>
              </div>
            </div>
        </div>
    </div>);
}
export default Home;
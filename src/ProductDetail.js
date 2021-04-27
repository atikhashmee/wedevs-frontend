import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Cart from './components/Cart'
import {CartContext} from './utils/Util'
let baseUrl = process.env.REACT_APP_.BASE_URL;

const ProductDetail = () => {
    let params = useParams();
    const [product, setproduct] = useState({});
    const {addToCart} = useContext(CartContext);


    useEffect(()=>{
        getProduct();
    }, []);
    function getProduct() {
        let formD = new FormData()
        formD.append('id', params.id);
        fetch(baseUrl+'products/show', {
            method: 'POST',
            body: formD
         }).then(res=>res.json())
         .then(res=>{
             if (res.status) {
                setproduct(res.data);
             }
         })
    }
    return ( <div className="row gx-0 gy-0">
    <div className="col-md-9">
      <Link to="/" className="btn btn-success">Go Back</Link>
      <div className="row mt-5">
            <div className="col-md-6">
                <img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className="card-img-top" alt="..." />
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-column p-4">
                    <div>Name:  <strong> {product.name}  </strong></div>
                    <div>Price:  <span> ${product.price} </span></div>
                    <div>Description:  <span> {product.description} </span></div>
                    <div>SKU:  <span> {product.sku} </span></div>
                    <div className="d-grid gap-2">
                        <button type="button" onClick={()=>{addToCart(product)}} className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
      </div>
    </div>
    <div className="col-md-3">
          <Cart />
    </div>
</div>);
}
 
export default ProductDetail;
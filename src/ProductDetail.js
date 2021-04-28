import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Cart from './components/Cart'
import {CartContext} from './utils/Util'
import isImage from 'is-image'

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
            {!isImage(product.image_url) && <img  className="card-img-top" src="https://via.placeholder.com/150" />}
            {isImage(product.image_url) && <img  className="card-img-top" width="150" height="150" src={product.image_url} />}
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
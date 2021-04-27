import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import {CartContext} from '../utils/Util';

function Product({product}) {
    const {addToCart} = useContext(CartContext);
    return (
        <div className="card" style={{width: 18+'rem'}}>
            <img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                    price ${product.price}
                </p>
                <div className="d-flex justify-content-between">
                    <button  onClick={()=>{addToCart(product)}} className="btn btn-primary">Add to Cart</button>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">Detail</Link>
                </div>
            </div>
        </div>
    );
}

export default Product;
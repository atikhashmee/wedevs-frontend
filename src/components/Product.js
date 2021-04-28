import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import {CartContext} from '../utils/Util';
import isImage from 'is-image'

function Product({product}) {
    const {addToCart} = useContext(CartContext);
    return (
        <div className="card" style={{width: 18+'rem'}}>
            {!isImage(product.image_url) && <img  className="card-img-top" src="https://via.placeholder.com/120" />}
            {isImage(product.image_url) && <img  className="card-img-top" width="150" height="150" src={product.image_url} />}
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
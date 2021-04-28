import React, {useContext, useEffect, useState} from 'react'
import Product from './components/Product'
import Cart from './components/Cart'

let baseUrl = process.env.REACT_APP_.BASE_URL;
function Home() {
    const [products, setproducts] = useState([]);

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
    return (<div className="row gx-0 gy-0">
        <div className="col-md-9">
          <div className="row gy-3">
            {products.length> 0 &&  products.map((item, index)=>(
              <div className="col-md-4" key={index}>
                <Product  product={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
              <Cart />
        </div>
    </div>);
}
export default Home;
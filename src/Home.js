import React from 'react'
import Product from './components/Product'
function Home() {
    return (
        <div className="row gx-5 gy-5">
          {Array(6).fill(0).map((item, index)=>(
            <div className="col-md-3">
              <Product key={index} />
            </div>
          ))}
        </div>
    );
}
export default Home;
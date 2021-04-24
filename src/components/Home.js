import React from 'react'
import Product from './Product'
function Home() {
    return (
        <div className="row">
          {Array(5).fill(0).map((item, index)=>(
            <div className="col-md-4">
              <Product key={index} />
            </div>
          ))}
        </div>
    );
}
export default Home;
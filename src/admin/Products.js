import React from 'react';

const Products = () => {
    return ( <>


        <h1>Product page</h1>
        <ProductLists />
    </> );
}

const ProductLists = () =>{
        return (
            <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                 <tbody>
                     {Array(5).fill(0).map((it,idd)=>(
                         <tr key={idd}>
                             <td>{idd}</td>
                             <td>{"name "+idd}</td>
                         </tr>
                     ))}
                 </tbody>
          </table>
        );
}
 
export default Products;
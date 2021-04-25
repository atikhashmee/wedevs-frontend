import React from 'react'

function Product() {
    return (
        <div class="card" style={{width: 18+'rem'}}>
            <img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    price $2344
                </p>
                <div className="d-flex justify-content-between">
                    <a href="#" class="btn btn-primary">Add to Cart</a>
                    <a href="#" class="btn btn-primary">View Detail</a>
                </div>
            </div>
        </div>
    );
}

export default Product;
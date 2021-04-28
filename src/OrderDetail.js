import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
let baseUrl = process.env.REACT_APP_.BASE_URL;

const OrderDetail = () => {
    let params = useParams();
    const [order, setorder] = useState({});
    const [orderItems, setorderItems] = useState([]);
    useEffect(()=>{
        let formD = new FormData();
        formD.append('order_id', params.id)
        fetch(baseUrl+'order/show', {
            method: 'POST',
            body: formD
        }).then(res=>res.json())
        .then(res=>{
            if (res.status) {
                setorder(res.data.order_info);
                setorderItems(res.data.order_items);
            } 
        })
    }, [])
    return ( <div className="card mt-5">
            <div className="card-header d-flex justify-content-between">
                <Link to="/orders" className="btn btn-success"  > Go Back</Link>
                <h5>Order detail</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <div > 
                            <h5>Order Information</h5>
                            <table>
                                <tr>
                                    <th>Tracking Number : </th>
                                    <td> {order.tracking_id}</td>
                                </tr>
                                <tr>
                                    <th>Order status : </th>
                                    <td> {order.status}</td>
                                </tr>
                                <tr>
                                    <th>Order Placed : </th>
                                    <td> {order.created_at}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="mt-3">
                            <h5>Shipping Information</h5>
                            <table>
                                <tr>
                                    <th>Address Name</th>
                                    <td>{order.address_name}</td>
                                </tr>
                                <tr>
                                    <th>Address Line 1</th>
                                    <td>{order.address_1}</td>
                                </tr>
                                <tr>
                                    <th>Address Line 2</th>
                                    <td>{order.address_2}</td>
                                </tr>
                                <tr>
                                    <th>Zones</th>
                                    <td>{order.city} {order.district} {order.zip_code} {order.country}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5>Payment Information</h5>
                        <table>
                            <tr>
                                <th>Payment Type</th>
                                <td>{order.payment_method}</td>
                            </tr>
                            <tr>
                                <th>Payment Status</th>
                                <td>{order.payment_status}</td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
                <div className="row mt-5">
                    <h5>Order Items</h5>
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Charge</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orderItems.length > 0 && orderItems.map((item,ke)=>(
                            <tr key={ke}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}</td>
                            </tr>
                        ))}
                </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <table className="table table-bordered border-primary">
                            <tr>
                                <th>Sub Total</th>
                                <td>{order.charge}</td>
                            </tr>
                            <tr>
                                <th>Discount (-)</th>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>{order.charge}</td>
                            </tr>
                            <tr>
                                <th>Paid</th>
                                <td>{order.charge}</td>
                            </tr>
                            <tr>
                                <th>Due</th>
                                <td>0</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
    </div> );
}
 
export default OrderDetail;
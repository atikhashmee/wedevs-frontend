import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from './utils/Util'
import {Link} from 'react-router-dom'

let baseUrl = process.env.REACT_APP_.BASE_URL;
function Orders() {
    const {auth} = useContext(AppContext)
    const [orders, setorders] = useState([]);
    useEffect(() => {
        if (auth.auth_token==="") window.location.href='/login'
    }, [auth]);
    useEffect(()=>{
        getOrders()
    }, [])

    function getOrders() {
        let formD = new FormData;
        formD.append('auth_token', auth.auth_token)
        fetch(baseUrl+'order/index', {
            method: 'POST',
            body: formD
         })
        .then(res=>res.json())
        .then(res=>{
            if (res.status) {
                setorders(res.data)
            }
        })
    }

    function changeStatus(order_id, status) {
        let formD = new FormData()
        formD.append('order_id', order_id)
        formD.append('status', status)
        fetch(baseUrl+"order/update", {
            method: 'POST',
            body: formD
        }).then(res=>res.json())
        .then(res=>{
            if (res.status) {
                getOrders();
            }
        })
    }

    return (
        <div>
            <h1>Orders</h1>
            <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tracking ID</th>
                        {auth.role==='admin'&& <th>User</th>}
                        <th>Charge</th>
                        <th>Status</th>
                        <th>Place date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((item,ke)=>(
                        <tr key={ke}>
                            <td>{item.id}</td>
                            <td>{item.tracking_id}</td>
                            {auth.role==='admin'&& <th>{item.username}</th>}
                            <td>${item.charge}</td>
                            <td>{item.status}</td>
                            <td>{item.created_at}</td>
                            <td> 
                                <div className="d-flex justify-content-between">
                                    <Link to={`/order/${item.id}`}>Detail</Link>
                                    {auth.role==='admin'&&  <div className="d-flex flex-column">
                                        <div className="text-primary">Change Status</div>
                                        <div className="d-flex">
                                            <button type="button" onClick={()=>{changeStatus(item.id, 'Processing')}} className="btn btn-sm btn-warning">Processing</button>
                                            <button type="button" onClick={()=>{changeStatus(item.id, 'Shipped')}} className="btn btn-sm btn-primary">Shipped</button>
                                            <button type="button" onClick={()=>{changeStatus(item.id, 'Delivered')}} className="btn btn-sm btn-success">Delivered</button>
                                        </div>
                                    </div>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;
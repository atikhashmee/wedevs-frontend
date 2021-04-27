import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from './utils/Util'

let baseUrl = process.env.REACT_APP_.BASE_URL;
function Orders() {
    const {auth} = useContext(AppContext)
    const [orders, setorders] = useState([]);
    useEffect(() => {
        if (auth.auth_token==="") window.location.href='/login'
    }, [auth]);
    useEffect(()=>{
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
    }, [])
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
                            <td>{item.charge}</td>
                            <td>{item.status}</td>
                            <td>{item.created_at}</td>
                            <td> 
                                <button className="btn btn-sm btn-primary">Detail</button> 
                                {auth.role==='admin'&&  <div className="btn-group">
                                    <button type="button" className="btn btn-danger">Change Status</button>
                                    <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;
import React, { useContext, useEffect, useState } from 'react';
import {AppContext, getData, putData} from './utils/Util'

let baseUrl = process.env.REACT_APP_.BASE_URL;
const Checkout = () => {
    const {auth} = useContext(AppContext)
    const [sItems, setsItems] = useState([]);
    let allItems = getData('cart_items')
    const [orderForm, setorderForm] = useState({
        address_name: '',
        address_1: '',
        address_2: '',
        city: '',
        district: '',
        zip_code: '',
        country: '',
        payment_method: 'cash_on_delivery'
    });
    const [err, seterr] = useState([]);

    function handleInput(obj) {
        setorderForm({...orderForm,  [obj.currentTarget.name]: obj.currentTarget.value});
    }


    useEffect(() => {
        if (auth.auth_token==="") window.location.href='/login'
    }, [auth]);
    useEffect(()=>{
        setsItems(allItems)
    }, [])

    function placeOrder(evt) {
        evt.preventDefault()
        let dataForm = []
        if (orderForm.address_name === '') {
            dataForm.push('Address Name can not be empty')
        }
        if (orderForm.zip_code === '') {
            dataForm.push('zip_code can not be empty')
        }
        if (orderForm.country === '') {
            dataForm.push('country can not be empty')
        }
        if (dataForm.length > 0) {
            seterr(dataForm)
            return; 
        }

        let formD = new FormData();
        for (const formName in orderForm) {
            formD.append(formName, orderForm[formName])
        }
        formD.append('items', JSON.stringify(allItems))
        formD.append('auth_token', auth.auth_token)
        fetch(baseUrl+'order/store', {
            method: 'POST',
            body: formD
         }).then(res=>res.json())
         .then(res=>{
             if (res.status) {
                seterr([]);
                putData([], 'cart_items');
                window.location.href ='/';
             } else {
                seterr([res.data])
             }
         })
    }

    return ( 
        <div className="mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Checkout</h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sItems.length>0 && sItems.map((item, kk)=>(
                                <tr key={kk}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Checkout Information</h4>
                </div>
                <div className="card-body">
                    <form method="POST" onSubmit={placeOrder}>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Shipping Address</h4>
                                <div className="form-group">
                                    <label>Address Name</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)}  name="address_name" />
                                </div>
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)}  name="address_1" />
                                </div>
                                <div className="form-group">
                                    <label>Address Line 2</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} name="address_2" />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} name="city" />
                                </div>
                                <div className="form-group">
                                    <label>District</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} name="district" />
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} name="zip_code" />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} name="country" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4>Payment</h4>
                                <div className="d-flex flex-column justify-content-between align-items-between" style={{height: '430px'}}>
                                    <div>
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={(obj)=>handleInput(obj)}  type="radio" name="payment_method" value="cash_on_delivery" id="flexRadioDefault1" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1" >Cash On Delivery</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input"  onChange={(obj)=>handleInput(obj)} type="radio" name="payment_method" id="flexRadioDefault2" value="other"  />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2" >Other</label>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        {err.length > 0 && err.map((item, kk)=> (
                                            <div key={kk} className="alert alert-danger alert-dismissible fade show" role="alert">
                                                <strong>Error !</strong> {item}
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        ))}
                                        <button type="submit" className="btn btn-primary">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Checkout;
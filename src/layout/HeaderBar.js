import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Orders  from '../Orders';
import Home from '../Home';
import Login from '../auth/Login'
import Register from '../auth/Register'
import {AppContext} from '../utils/Util'
import Dashboard  from '../admin/Dashboard'
import Products  from '../admin/Products'

function HeaderBar() {
  const {auth, logout} = useContext(AppContext);
  useEffect(()=>{
    console.log(auth, 'asdfssss')
  },[auth])
    return (<Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand">We Devs</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    {(auth && auth.auth_token !== "" &&  auth.role==='admin') && <>
                      <li className="nav-item">
                            <Link to="/products" className="nav-link ">Products</Link>
                        </li>
                    </>}
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link ">Orders</Link>
                    </li>
                    {(auth && auth.auth_token == "") && ( <>
                      <li className="nav-item">
                          <Link to="/login" className="nav-link ">Login</Link>
                      </li>
                      <li className="nav-item">
                          <Link to="/register" className="nav-link ">Register</Link>
                      </li>

                    </>)}
                    {(auth && auth.auth_token !== "") && <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Account
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><a className="dropdown-item" onClick={()=>{logout()}}  href="Javascript:void(0)" >Logout</a></li>
                        </ul>
                    </li>}
                    
                </ul>
            </div>
            </div>
        </nav>

        <Switch>
          <Route exact path="/">
                {(auth.role=="user" || auth.role=="") && <Home />}
                {auth.role=="admin" && <Dashboard />}
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
 </Router>);
}

export default HeaderBar;
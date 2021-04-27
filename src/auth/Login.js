import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {getParameterByName, putData, AppContext} from '../utils/Util';

let baseUrl = process.env.REACT_APP_.BASE_URL;

function Login() {
    const [loginObj, setLoginObj] = useState({
      username: '',
      password: '',
      rememberMe: false
    });
    const {loginAuth} = useContext(AppContext)
    const [err, setErr] = useState([]);
    const [succesMessage, setSuccesMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    function handleInput(obj) {
      setLoginObj({...loginObj,  [obj.currentTarget.name]: obj.currentTarget.value});
    }

    useEffect(()=>{
      if (getParameterByName('msg') !== null) {
         setSuccesMessage(getParameterByName('msg'));
      }
    }, [])

    function login(evt) {
      evt.preventDefault();
      setErr([]);
      let errors = [];
      if (loginObj.username == '') {
        errors.push('Username can not be empty')
      }
      
      if (loginObj.password == '') {
        errors.push('Password can not be empty')
      }
      setErr(errors);
      if (errors.length > 0) return;
      let formD = new FormData;
      formD.append('username', loginObj.username)
      formD.append('password', loginObj.password)
      fetch(baseUrl+'login', {
         method: 'POST',
         body: formD
      }).then(res=>res.json())
      .then(res=>{
         if (res.status) {
            putData(res.data, 'auth');
            setSuccesMessage(res.message+" , Please wait, we will redirect you")
            loginAuth(res.data);
            setTimeout(() => {
               window.location.href = window.location.origin+"/"
            }, 1000);
         } else {
            setErrorMessage(res.data);
         }
      })
    }

    return ( <div className="d-flex justify-content-center align-items-center h-90vh ">
    <div className="custom-wrapper">
        <h3 className="text-center">User Login</h3>
         {succesMessage!=="" && <h4 className="text-success text-center">{succesMessage}</h4>}
       <form  onSubmit={login} method="POST">
          <div className="row mb-3">
             <label htmlFor="username" className="col-sm-2 col-form-label">Email</label>
             <div className="col-sm-10">
                <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} id="username" name="username" />
             </div>
          </div>
          <div className="row mb-3">
             <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
             <div className="col-sm-10">
                <input type="password" className="form-control" onChange={(obj)=>handleInput(obj)} id="password" name="password" />
             </div>
          </div>
          <div className="row mb-3">
             <div className="col-sm-10 offset-sm-2">
                <div className="form-check">
                   <input className="form-check-input" onChange={(obj)=>handleInput(obj)} type="checkbox" id="rememberMe" name="rememberMe" />
                   <label className="form-check-label" htmlFor="rememberMe">
                   Remember Me
                   </label>
                </div>
             </div>
          </div>
          {errorMessage!=="" && <h6 className="text-danger text-center">Credential do not match our records</h6>}
          <div className="row mb-3">
             <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"></label>
             <div className="col-sm-10">  
                  {err.length > 0 && err.map((msg, ind)=>(<p key={ind} className="text-danger">{msg}</p>))}
                  <div className="d-flex justify-content-between">
                     <Link to="/register" className="btn btn-primary">Sign Up</Link>
                     <button type="submit" className="btn btn-primary">Sign in</button>
                  </div>
             </div>
          </div>
       </form>
    </div>
 </div>
);
}
export default Login;
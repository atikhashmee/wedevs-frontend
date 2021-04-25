import React, { useState } from 'react'

function Login() {
    const [loginObj, setLoginObj] = useState({
      username: '',
      password: '',
      rememberMe: false
    });
    const [err, setErr] = useState([]);
    function handleInput(obj) {
      setLoginObj({...loginObj,  [obj.currentTarget.name]: obj.currentTarget.value});
    }

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

      console.log(loginObj, 'form submit');
    }
    return ( <div className="d-flex justify-content-center align-items-center h-90vh ">
    <div className="custom-wrapper">
        <h3 className="text-center">User Login</h3>
       <form  onSubmit={login} method="POST">
          <div className="row mb-3">
             <label for="username" className="col-sm-2 col-form-label">Email</label>
             <div className="col-sm-10">
                <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} id="username" name="username" />
             </div>
          </div>
          <div className="row mb-3">
             <label for="password" className="col-sm-2 col-form-label">Password</label>
             <div className="col-sm-10">
                <input type="password" className="form-control" onChange={(obj)=>handleInput(obj)} id="password" name="password" />
             </div>
          </div>
          <div className="row mb-3">
             <div className="col-sm-10 offset-sm-2">
                <div className="form-check">
                   <input className="form-check-input" onChange={(obj)=>handleInput(obj)} type="checkbox" id="rememberMe" name="rememberMe" />
                   <label className="form-check-label" for="rememberMe">
                   Remember Me
                   </label>
                </div>
             </div>
          </div>
          <div className="row mb-3">
             <label for="inputPassword3" className="col-sm-2 col-form-label"></label>
             <div className="col-sm-10">  
             {err.length > 0 && err.map((msg, ind)=>(<p key={ind} className="text-danger">{msg}</p>))}
                  <button type="submit" className="btn btn-primary">Sign in</button>
             </div>
          </div>
       </form>
    </div>
 </div>
);
}
export default Login;
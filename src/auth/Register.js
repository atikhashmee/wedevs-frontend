import React, { useEffect, useState } from 'react'
let baseUrl = process.env.REACT_APP_.BASE_URL;

function Register() {
    const [regForm, setRegForm] = useState({
      username: '',
      email: '',
      password: '',
      phone: '',
    });

    const [err, setErr] = useState([]);

    function handleInput(obj) {
      setRegForm({...regForm,  [obj.currentTarget.name]: obj.currentTarget.value});
    }

    useEffect(()=>{
      console.log(err, new URL(window.location.href), 'FFFF')
    }, [err])

    function submitForm(evt) {
      evt.preventDefault()
      setErr([]);
      let errors = [];
      if (regForm.username == '') {
        errors.push('Username can not be empty')
      }
      
      if (regForm.password == '') {
        errors.push('Password can not be empty')
      }
      setErr(errors);
      if (errors.length > 0) return;
      let formD = new FormData;
      formD.append('username', regForm.username)
      formD.append('password', regForm.password)
      formD.append('email', regForm.email)
      formD.append('phone', regForm.phone)
      fetch(baseUrl+'registration', {
         method: 'POST',
         body: formD
      }).then(res=>res.json())
      .then(res=>{
          if (res.status) {
              window.location.href=window.location.origin+'/login?msg=successfully Registered';
          } else {
            errors.push(res.data)
            setErr(errors);
            console.log(errors)
          }
      })
      console.log(regForm, 'form submit');
    }

    return (<div className="d-flex justify-content-center align-items-center h-90vh "> 
              <div className="custom-wrapper">
               <h3 className="text-center">User Registration</h3>
              <form className="reg-form-width" onSubmit={submitForm} method="POST">
                <div className="row mb-2">
                  <label htmlFor="username" className="col-form-label">Username <span className="text-danger">*</span> </label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} id="username" name="username" required  />
                  </div>
                </div>
                <div className="row mb-2">
                  <label htmlFor="email" className="col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" onChange={(obj)=>handleInput(obj)}  id="email" name="email" />
                  </div>
                </div>
                <div className="row mb-2">
                  <label htmlFor="password" className="col-form-label">Passowrd <span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" onChange={(obj)=>handleInput(obj)} id="password" name="password"  required />
                  </div>
                </div>
                <div className="row mb-2">
                  <label htmlFor="phone" className="col-form-label">Phone</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" onChange={(obj)=>handleInput(obj)} id="phone" name="phone" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-10">
                      {err.length > 0 && err.map((msg, ind)=>(<p key={ind} className="text-danger">{msg}</p>))}
                      <button type="submit" className="btn btn-primary">Sing up</button>
                  </div>
                </div>
              </form> 
              </div>
            </div>);
}
export default Register;
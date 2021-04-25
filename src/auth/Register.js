import React, { useEffect, useState } from 'react'

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

      console.log(regForm, 'form submit');
    }

    useEffect(()=>{
      console.log(regForm);
    }, [regForm])

    return (<div className="d-flex justify-content-center align-items-center h-100vh"> 
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
            </div>);
}
export default Register;
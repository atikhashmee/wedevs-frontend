import React, { useState, useEffect } from 'react';
import {AppContext, getData, putData} from '../utils/Util'


let baseUrl = process.env.REACT_APP_.BASE_URL;

const AppPro = (props) => {
    const [auth, setauth] = useState({});

    useEffect(()=>{
        setauth(getData('auth'));
    }, []);


    function loginAuth(auth) {
        console.log(auth, 'asdfasdaaaaaaaaaaaa')
        setauth(auth);
        putData(auth, 'auth');
    }

    function logout() {
        let formD = new FormData;
        formD.append('id', auth.id);
        fetch(baseUrl+'logout', {
            method: 'POST',
            body: formD
        }).then(res=>res.json())
        .then(res=>{
            auth.auth_token = "";
            auth.email = "";
            auth.phone = "";
            auth.username = "";
            putData(auth, 'auth');
            window.location.href = window.location.origin+'/';
        });
    }

    return (<AppContext.Provider value={{
        auth,
        logout,
        loginAuth
    }}> 
         {props.children}
    </AppContext.Provider>);
}
 
export default AppPro;
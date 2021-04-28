import React, { useState, useEffect } from 'react';

let baseUrl = process.env.REACT_APP_.BASE_URL;
const Users = () => {
    const [users, setusers] = useState([]);
    useEffect(()=>{
        fetch(baseUrl+"users").then(res=>res.json())
        .then(res=>{
            if (res.status) {
                setusers(res.data);
            }
        })
    }, [])
    return (  <div className="card mt-5">
                <div className="card-header">Users</div>
                <div className="card-body">
                <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                {users.length > 0 && users.map((item,ke)=>(
                    <tr key={ke}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))}
            </tbody>
</table>
                </div>
    </div> );
}
 
export default Users;
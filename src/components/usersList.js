import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState();

    const fetchUsers = async () => {
        await fetch("http://localhost:5000/users", {
            method: "GET",
            crossDomain: true,
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUsers(data);
        })
    }

    const logOut = () => {
        localStorage.removeItem("token");
        setToken(undefined);
    }

    useEffect(() => {
        let _token = localStorage.getItem("token");
        if(_token === null || _token === undefined) {
            navigate("/sign-in");
        } else {
            setToken(_token);
        }
    }, [token])

    useEffect(() => {
        fetchUsers();
    }, [users, token]) 

    return  (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <h4>
                        ASSIGNMENT
                    </h4>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" onClick={logOut}>
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users &&
                        users.map((content, index) => 
                            <tr key={index}>
                                <td>{content._id}</td>
                                <td>{content.fname}</td>
                                <td>{content.lname}</td>
                                <td>{content.email}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

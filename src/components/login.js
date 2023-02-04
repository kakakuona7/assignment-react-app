import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,SetError] = useState(false)
    
    const submit = (e) => {
        e.preventDefault();
        if(email.length==0|password.length==0)
        SetError(true)
        
        fetch ("http://localhost:5000/login-user", {
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({ email, password }),
        })
        .then((res)=>res.json())
        .then((data) => {
            if(data.status === "ok"){
                localStorage.setItem("token", data.data)
                navigate("/")
            }
        })
    }
    return (
        <form onSubmit={submit}>
            <h3>Sign In</h3>

            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            {error&&email.length <=0?
                    <h7>fill this field</h7>:""}

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            {error&&password.length <=0?
                    <h7>fill this field</h7>:""}
            

            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                    </label>
                </div>
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    )
}

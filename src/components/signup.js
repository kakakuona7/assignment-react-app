import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function SignUp() {
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,SetError] = useState(false)

    const submit = (e) => {
        e.preventDefault();
        if(fname.length==0|lname.length==0|email.length==0|password.length==0)
        SetError(true)
        
        fetch ("http://localhost:5000/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                fname,
                lname,
                email,
                password
            }),

        }).then((res)=>res.json())
        .then((data) => {
            if(data.status=="ok"){
                alert("Registration successful")
                navigate("/sign-in");
            }
        })
    }

    
        return (
            <form onSubmit={submit}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={fname}
                        onChange={(e)=> setFname(e.target.value)}
                    />
                    </div>
                    {error&&fname.length <=0?
                    <h7>fill this field</h7>:""}

                <div className="mb-3">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" 
                    value={lname}
                    onChange={(e)=> setLname(e.target.value)}
                    />
                </div>
                {error&&lname.length <=0?
                    <h7>fill this field</h7>:""}

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error&&password.length <=0?
                    <h7>fill this field</h7>:""}

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                        </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        )
}

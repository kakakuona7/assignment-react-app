import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'

import Login from "./components/login"
import SignUp from "./components/signup"

import UserList from "./components/usersList"


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>

            <Outlet />
        </Router>
    )
}

export default App

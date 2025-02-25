import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
function AppRoutes() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={<Register/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/project" element={<Project/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes
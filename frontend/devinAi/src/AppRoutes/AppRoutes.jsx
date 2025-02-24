import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
function AppRoutes() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={<Register/>} />
            <Route exact path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes
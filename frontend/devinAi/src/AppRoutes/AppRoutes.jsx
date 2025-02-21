import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
function AppRoutes() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<>home</>} />
            <Route exact path="/signup" element={<Register/>} />
            <Route exact path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes
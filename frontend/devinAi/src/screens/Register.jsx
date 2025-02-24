import React, { useContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from '../config.js/axios'
import { userContext } from '../context/user.context.jsx';
function Register() {
    const navigate = useNavigate() ;
    const {setUser} = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/register', {email, password}).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            setUser(res?.data?.user)
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
    }

  return ( 
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white text-center mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                <input
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
                SignUp
            </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
           Login into Account{'  '}
            <button  className="text-blue-400 hover:underline">
               <Link to="/login">Login here</Link>
            </button>
        </p>
    </div>
    </div>
  )
}

export default Register
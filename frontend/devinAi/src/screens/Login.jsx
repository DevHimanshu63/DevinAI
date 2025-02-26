import React, { useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from '../config.js/axios.js';
import {userContext}  from '../context/user.context.jsx'
const Login = () => {
    const { user,setUser } = useContext(userContext);
    const navigate = useNavigate() ;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/users/login', {email , password }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            setUser(res?.data?.user)
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })

       
    };

    const navigateToSignup = () => {
        history.push('/signup');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl text-white text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                        onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Don't have an account?{' '}
                    <button  className="text-blue-400 hover:underline">
                       <Link to="/signup">Sign up</Link>
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
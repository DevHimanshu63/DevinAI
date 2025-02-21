import React from 'react'
import { Link } from 'react-router-dom'
function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white text-center mb-6">Signup</h2>
        <form onSubmit={''}>
            <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                <input
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
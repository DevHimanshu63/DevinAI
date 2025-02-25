import React, { useContext, useState } from 'react'
import { userContext } from '../context/user.context.jsx';
import axios from '../config.js/axios.js';
function Home() {
    const { user } = useContext(userContext);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const createProject = (e) => {
        e.preventDefault();
        axios.post('/project/create', {name: projectName}).then((res) => {
            console.log(res.data)
            closeModal();
        }).catch((err) => {
            console.log(err)
        })
    }

    const closeModal = () => {
        setIsModelOpen(false);
    }

    return (
        <div className='p-4'>
            <div className=''>
                <button 
                    className='p-4 border border-slate-300 rounded-md'
                    onClick={() => setIsModelOpen(true)}
                >
                    <i className="ri-link"></i>
                </button>
            </div>

            {isModelOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-xl mb-4">Create Project</h2>
                        <form onSubmit={createProject} >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input 
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" 
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
                                    required 
                                />
                            </div>
                           
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="mr-2 p-2 bg-gray-300 rounded-md"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="p-2 bg-blue-500 text-white rounded-md"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/user.context.jsx';
import axios from '../config.js/axios.js';
import { useNavigate } from 'react-router-dom';
function Home() {
    const { user } = useContext(userContext);
    const navigate = useNavigate() ;
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectList, setProjectList] = useState([]);
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
    useEffect(()=>{
        console.log('useeffect called');
        axios.get('/project/all').then((res) => {
            setProjectList(res.data.projects);
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
    })
    },[])

    return (
        <div className='p-4 flex flex-wrap items-center gap-4'>
            <div className=''>
                <button 
                    className='p-4 bg-blue-500 text-white border border-slate-300 rounded-md'
                    onClick={() => setIsModelOpen(true)}
                >
                   <p className='font-medium text-lg '>Create project  <i className="ri-link"></i></p>
                </button>
            </div>
            {
                projectList.map((project) => (
                    <div key={project._id}
                    onClick={() => navigate(`/project`,{
                        state:{project}
                    })}
                    className='p-4 hover:bg-slate-300 cursor-pointer border border-slate-300 rounded-md mt-4'>
                        <h2 className='text-xl px-2'>{project.name}</h2>
                        <div className='flex '>
                        <p className='px-2'><i class="ri-user-line"></i>Collaborators:</p>
                         {project.users.length}
                        </div>
                    </div>
                ))
            }

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
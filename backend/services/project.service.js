import projectModel from "../models/project.model.js";

 const createProject = async ({name  , userId})=>{
    if(!name || !userId){
        throw new Error(`All fields are required ${name} || ${userId}`);
    }
   let project;
    try{
         project = await projectModel.create({
            name,
            users:[userId]
        })
    }catch(err){
        if(err.code === 11000){
            throw new Error(`Project with name ${name} already exists`);
        }else{
            throw new Error(err.message);
        }
    }


    return project;
}

const getAllProjects = async({userId})=>{
    if(!userId){
        throw new Error('User id is required');
    }
    const projects = await projectModel.find({users:userId});
    return projects;
}

const addUserToProjects = async ({projectId , users , userId})=>{
    if(!projectId || !users){
        throw new Error(`All fields are required ${projectId} || ${users}`);
    }
    const project = await projectModel.findOne({
        _id:projectId,
        users:userId
    });
    if(!project){
        throw new Error(`Project with id ${projectId} not found`);
    }
    const updatedProject = await projectModel.findByIdAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{new:true});
    return updatedProject;
   
     
}
export  {createProject , getAllProjects , addUserToProjects};

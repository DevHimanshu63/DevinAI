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
export  {createProject , getAllProjects};

import projectModel from "../models/project.model.js";

 const createProject = async ({name  , userId})=>{
    if(!name || !userId){
        throw new Error(`All fields are required ${name} || ${userId}`);
    }
   
    const project = await projectModel.create({
        name,
        users:[userId]
    })

    return project;

}

export  {createProject};
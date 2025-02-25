import  {createProject as createProjectService , getAllProjects} from "../services/project.service.js"
import userModel from '../models/user.model.js'
import { validationResult } from "express-validator";


const createProject =async (req , res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        console.log('data recived from client for creating project',req.body , req.user.email);

        const {name} = req.body;
        const loggedInUser = await userModel.findOne({email:req.user.email});
        console.log("logged in user", loggedInUser);
        
        const newProject = await createProjectService({name, userId:loggedInUser._id});
        
        res.status(201).json(newProject);
    }catch(err){
        console.log(err);
        res.status(400).json({error: err.message});
    }
}

const  getAllProject = async (req, res) => {
    try{
        const loggedInUser = await userModel.findOne({email:req.user.email});
        console.log("logged in user", loggedInUser);
        const allUserProjects = await getAllProjects({userId:loggedInUser._id});
        res.status(200).json({projects:allUserProjects});
    }catch(err){
        console.log(err);
        res.status(400).json({error: err.message});
    }
}


export  {createProject ,  getAllProject};
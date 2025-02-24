import mongoose from "mongoose";

const projectSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
})

const project = mongoose.model('Project', projectSchema);
export default project;
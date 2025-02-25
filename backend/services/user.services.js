import userModel from "../models/user.model.js";



export const createUser = async({email , password})=>{
    if(!email || !password){
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        email,
        password: await userModel.hashPassword(password)
    })
    await user.save();
    return user ;
}

export const getAlluser = async({userId})=>{
    if(!userId){
        throw new Error('User id is required');
    }
    const users = await userModel.find({
        _id:{$ne:userId}
    });
    return users;
}

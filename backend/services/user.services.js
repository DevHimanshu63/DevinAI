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

import userModel from "../models/user.model.js";
import * as userServices from "../services/user.services.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";
export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userServices.createUser(req.body);
    const token = user.generateJWT();
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Server Error");
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{

    const { email, password } = req.body
    const user = await userModel.findOne({email}).select('+password');
    if(!user) return res.status(400).json({msg:'User not found'});
    const isMatch = await user.isValidPassword(password);
    if(!isMatch) return res.status(401).json({errors:'Invalid password'});
    const token = user.generateJWT();
    res.status(200).json({ user, token });

  }catch(err){
    console.log(err);
  }
  
}



export const ProfileController = async (req, res) => {
  try{
    res.status(200).json({ user: req.user });
  }catch(err){
    console.log(err);
  }
}

export const logoutController = async (req, res) => {
  try{
    const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
    await redisClient.set(token , 'logout' ,'EX' , 60 * 60 * 24);
    res.status(200).json({ message:'Logout successfully'});
  }catch(err){
    console.log(err);
  }
}

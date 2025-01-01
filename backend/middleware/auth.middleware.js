import jwt from 'jsonwebtoken'
import redisClient from '../services/redis.service.js';
export const authUser = async (req, res , next) =>{
    console.log(req.headers);
    try{
        const token = req.cookies.token ||  req.headers.authorization.split(' ')[ 1 ] ;
        if(!token) return res.status(401).json({msg: 'No token, authorization denied'});
        const isBlacklisted = await redisClient.get(token);
        if(isBlacklisted) {
            res.cookie('token','');
            return res.status(401).json({msg: 'Token is blacklisted'});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({msg: 'Token is not valid'});
    }

}
import dotenv from 'dotenv'
dotenv.config();
import http from "http";
import app from "./app.js"
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import projectModel from './models/project.model.js';
import { generateResult } from './services/ai.service.js';
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Socket.IO setup
const io = new Server(server,{
    cors:{
        origin: '*'
    }
});
io.use( async (socket , next) =>{ //to prevent unauthorised user middleware
    try{
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;
        socket.project = await projectModel.findById(projectId);
        if(!token) return next(new Error('Authentication error'));
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded) return next(new Error('Authentication error'));
        socket.user = decoded;
        next();
    }catch(e){
        next(e);
    }
})
io.on('connection', socket => {
    socket.roomId = socket.project._id.toString();
    
    
    console.log('a user connected');
    socket.join(socket.roomId); 
    socket.on('project-message', async (data) => {
        const message = data.message;
        const aiIsPresentInmessage = message.includes('@ai');
        if(aiIsPresentInmessage){
            const prompt = message.replace('@ai');
            const result = await generateResult(prompt);
            io.to(socket.roomId).emit('project-message', {message:result , 
                sender:{
                    _id:'ai',
                    email:'AI'
                }
        });
        }
        console.log('project-message data recieved from client side',data);
        socket.broadcast.to(socket.roomId).emit('project-message', data);
    });

//   socket.on('disconnect', () => { 
//     console.log('user disconnected');
//     socket.leave(socket.roomId); 
//    });
});



server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})
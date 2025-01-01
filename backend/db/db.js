import mongoose from 'mongoose';

function connectDB(){
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log(err);
    })
}

export default connectDB;
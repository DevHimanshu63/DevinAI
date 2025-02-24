import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import connectDB from './db/db.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import projectRoutes from "./routes/project.routes.js"
connectDB()
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/users', userRoutes)
app.use('/project', projectRoutes)

app.get('/', (req, res) =>{
    res.send('Welcome to the Node.js API!')
})
export default app ;
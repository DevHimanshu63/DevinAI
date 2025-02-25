import { Router } from "express";
import { body } from "express-validator";
import  {createProject ,  getAllProject} from '../controllers/project.controller.js'
import  { authUser } from '../middleware/auth.middleware.js'
const router = Router();



router.post('/create', 
    authUser,
    body('name').notEmpty().withMessage('Name is required'),
    createProject
)


router.get('/all', 
    authUser,
    getAllProject
)

export default router;
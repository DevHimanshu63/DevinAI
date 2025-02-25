import { Router } from "express";
import { body } from "express-validator";
import  {createProject ,  getAllProject , addUserToProject , getProjectById} from '../controllers/project.controller.js'
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

router.put('/add-user', 
    authUser,
    body('projectId').isString().withMessage('projectId must be an string'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array with at least one user'),
    body('users.*').isString().withMessage('Each user must be a string'),
    addUserToProject
)

router.get('/get-project/:projectId',
    authUser,
   getProjectById
)
export default router;
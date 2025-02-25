import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';
import * as middleware from '../middleware/auth.middleware.js';
const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Enter your valid email'),
    body('password').isLength({min : 3}).withMessage('Enter your password min 3 characters'),
    userController.createUserController
)
router.post('/login',
    body('email').isEmail().withMessage('Enter your valid email'),
    body('password').isLength({min : 3}).withMessage('Enter your password min 3 characters'),
    userController.loginUserController
)
router.get('/profile', middleware.authUser , userController.ProfileController )

router.get('/logout', middleware.authUser , userController.logoutController )
router.get('/all-users', middleware.authUser , userController.getAllUsersController )

export default router ;

 import { Router } from "express";
 import {googleLogin,login,register,getMe} from '../controllers/auth.controllers.js'
 import {isAuthenticated} from '../middleware/auth.middleware.js'

 const router = Router()
router.get('/google',googleLogin)
router.post('/login',login)
router.post('/register',register)
router.get('/get-me',isAuthenticated,getMe)

 export default router
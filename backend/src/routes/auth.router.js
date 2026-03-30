 import { Router } from "express";
 import {googleLogin,login,register} from '../controllers/auth.controllers.js'

 const router = Router()
router.get('/google',googleLogin)
router.post('/login',login)
router.post('/register',register)

 export default router
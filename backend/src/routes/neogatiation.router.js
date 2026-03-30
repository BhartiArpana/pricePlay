import Router from 'express'
import {isAuthenticated} from '../middleware/auth.middleware.js'
import { negotiation } from '../controllers/neogatiation.controllets.js'

const router = Router()
router.post('/neogatiation/:productId',isAuthenticated,negotiation)


export default router
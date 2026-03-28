import Router from 'express'
import multer from 'multer'
import {addProduct} from '../controllers/product.contorllers.js'

const router = Router()

const upload = multer({storage:multer.memoryStorage()})

//  @post /api/product/add
router.post('/add',upload.single("image"),addProduct)

export default router
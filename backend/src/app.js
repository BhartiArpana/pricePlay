import express from 'express'
import ProductRouter from './routes/product.router.js'
import authRouter from './routes/auth.router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
))

app.use('/api/product',ProductRouter)
app.use('/auth',authRouter)



export default app
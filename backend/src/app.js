import express from 'express'
import router from './routes/product.routes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
))

app.use('/api/product',router)




export default app
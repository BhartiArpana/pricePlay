
import mongoose from "mongoose";

export async function connectToDb(){
     mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log('Connected to database');
        
     })
}
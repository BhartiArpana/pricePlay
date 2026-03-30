import mongoose from "mongoose";

export const authSchema = new mongoose.Schema({
    name:String,
    Image:String,
    email:String,
    password:{
        type:String,
        default:null
    },
    provider:{
        type:String,
        enum:['google',"manual"]
    }
})

export const useModel = mongoose.model('users',authSchema)
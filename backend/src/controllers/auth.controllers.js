import { oauth2Client } from "../utils/googleConfig.js"
import { useModel } from "../models/auth.model.js";
import axios from 'axios'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function googleLogin(req,res){
   try{
    const {code} = req.query;
   const googleRes = await oauth2Client.getToken(code)
   oauth2Client.setCredentials(googleRes.tokens);


   const userRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
   const {name,picture,email} = userRes.data
   let user = await useModel.findOne({email})
   if(!user){
     user = await useModel.create({
        name,email, image:picture,provider:'google'
     })
   }
   const {_id} = user
   const token = jwt.sign({
    id:user._id,
    email:user.email,
    name:user.name
   },process.env.JWT_SECRET_KEY)
   res.status(200).json({
    message:"success",
    user,
    token
   })
   }catch(error){
    console.error("❌ GOOGLE EXCHANGE ERROR:");
        if (error.response) {
            // Google ne error return kiya (400, 401 etc)
            console.error("Data:", error.response.data); 
        } else {
            // Network ya syntax error
            console.error("Message:", error.message);
        }
        
        res.status(400).json({ message: "Authentication failed", error: error.message });
   }
}

export async function login(req,res){
    const {email,password} = req.body

    const user = await useModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message:"User not found!"
        })
    }

    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword){
        return res.status(401).json({
            message:"wrong password"
        })
    }

    const token = jwt.sign({
        email:user.email,
        id:user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie('token',token)

    res.status(200).json({
        message:"Login success",
        user
    })
}

export async function register(req,res){
    const {name,email, password} = req.body

    const isUserAlreadyEXist = await useModel.findOne({email})
    if(isUserAlreadyEXist){
        return res.status(400).json({
            message:"User already exist"
        })
    }
    const hash = await bcrypt.hash(password,10)

    const user = await useModel.create({
        name:name,
        email:email,
        password:hash,
        provider:"manual"
    })

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET_KEY)

    res.cookie('token',token)
    res.status(201).json({
        message:"register success",
        user
    })
}
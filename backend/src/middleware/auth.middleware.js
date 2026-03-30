import jwt from 'jsonwebtoken';
import { useModel } from '../models/auth.model.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        // Token headers se ya cookies se nikalna (Commonly 'Authorization' header)
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
        console.log("Token Received:", token)

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("decoded",decoded.id);
        


        const user = await useModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
};
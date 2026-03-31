import { createContext } from "react";
import { useAuth } from "../hook/useAuth";
import {Navigate, useNavigate} from 'react-router-dom'

export const Protected= ({children})=>{
   const {loading,user} = useAuth()
   const navigate = useNavigate()

   if(loading){
    return <h1>Loading...</h1>
   }
   if(!user){
     return <Navigate to="/login" replace />;
   }

   return (children)
}
export default Protected
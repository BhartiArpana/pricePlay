import {login,register} from '../services/auth.api'
import { AuthContext } from '../auth.context'
import { useContext } from 'react'

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

   const handleLogin = async(email,password)=>{
     try{
         setLoading(true)
      const data = await login(email,password)
    //   console.log(data);
      setUser(data)
     }catch(err){
        console.log(err);
     }finally{
        setLoading(false)
     }

   }

   const handleRegister = async(name,email,password)=>{
    try{
        setLoading(true)
        const data = await register(name,email,password)
        // console.log(data);
        
        setUser(data)
    }catch(err){
        console.log(err);
        
    }finally{
        setLoading(false)
    }
   }

   return {handleLogin,handleRegister}
}
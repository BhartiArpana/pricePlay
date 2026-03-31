import {login,register,getMe} from '../services/auth.api'
import { AuthContext } from '../auth.context'
import { useContext } from 'react'
import { useEffect } from 'react'

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
        if (data.token) {
       localStorage.setItem("token", data.token);
    }
        
        setUser(data.user ||data)
    }catch(err){
        console.log(err);
        
    }finally{
        setLoading(false)
    }
   }

   const handleGetMe  = async()=>{
    try{
    setLoading(true)
    const data = await getMe()
    setUser(data)
  }catch(err){
    console.log(err)
    setUser(null)
  }finally{
    setLoading(false)  
  }
   }

   useEffect(()=>{
    const token  = localStorage.getItem("token")
    if(token){
        handleGetMe()
    }
   },[])


   return {loading,user,handleLogin,handleRegister,handleGetMe}
}
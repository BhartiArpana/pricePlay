import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000/auth',
    withCredentials:true
})

export const googleAuth = (code)=> api.get(`/google?code=${code}`)

export const login =async (email,password)=>{
    const response = await api.post('/login',{email,password})
    return response.data
}

export const register = async(name,email,password)=>{
    const response = await api.post('/register',{name,email,password})
    return response.data
}

export const getMe = async()=>{
    const response = await api.get('/get-me')
    return response.data
}
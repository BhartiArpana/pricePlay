import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export async function getProducts(){
    const response = await api.get('/api/product')
    return response.data
}
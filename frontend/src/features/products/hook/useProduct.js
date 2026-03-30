import {getProducts} from '../services/product.api'
import { ProductContext } from '../product.context'
import { useContext } from 'react'
import Products from '../pages/Products'

export const useProduct = ()=>{
    const context = useContext(ProductContext)
    const {loading,setLoading,product, setProduct} = context

    const handleGetProducts = async()=>{
       setLoading(true)
       const data = await getProducts()
       console.log(data.allProducts);
       setProduct(data.allProducts)
       setLoading(false)
       
    }
     return {
    loading,
    product,
    handleGetProducts
 }
}

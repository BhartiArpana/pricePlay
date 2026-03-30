import { createContext, useContext,useState } from "react";

export const ProductContext = createContext()

export const ProductProvider = ({children})=>{
    const [product,setProduct] = useState([])
    const [loading,setLoading] = useState(false)

    return <ProductContext.Provider value = {{loading,setLoading,product, setProduct}}>
           {children}
         </ProductContext.Provider>
}


import React, { useEffect } from 'react'
import Card from '../components/Card'
import '../styles/products.scss'
import { useProduct } from '../hook/useProduct'

const Products = () => {
  const {loading,product,handleGetProducts}  = useProduct()
 
  

 useEffect(()=>{
  handleGetProducts()
 },[])

  const products = product
  console.log(products);
 
  
  return (
    <div className='products'>
      
      <div className="product">
        {
          products.map((elem,id)=>{
          return <Card 
          key={id}
          image={elem.image}
          title={elem.title}
          price={elem.price}
          />
        })}
      </div>
      
      </div>
  )
}

export default Products
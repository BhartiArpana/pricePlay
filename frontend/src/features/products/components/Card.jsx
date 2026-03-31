import React from 'react'
import '../styles/card.scss'
import {useAuth} from '../../auth/hook/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

const Card = ({image,title,price}) => {

   const navigate = useNavigate()
   
const handleUserLoggin = ()=>{
   navigate('/chat')
}
  
  
  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={image} alt='image not found' className="product-img" />
      </div>
      
      <div className="card-details">
        <h3 className="product-title">{title}</h3>
        
        <div className="price-tag">
          <span className="label">Price:</span>
          <span className="value">{price}</span>
        </div>

        <button 
          className="negotiate-btn" 
        //   onClick={onStart}
          aria-label={`Start negotiating for title`}
          onClick={handleUserLoggin}
        >
          Start Negotiation
        </button>
      </div>
    </div>
  );
}

export default Card
import React from 'react'
import '../styles/cardDetails.scss'

const CardDetails = () => {
  return (
    <div className="card">

      <div className="card__image">
        <img src="laptop.png" alt="product" />
      </div>

      <div className="card__content">

        {/* Title */}
        <h3 className="card__title">
          OLEVS Men's Business Watch Gold Blue
        </h3>

        {/* Price */}
        <div className="card__priceBox">
          <span className="card__priceLabel">Price</span>
          <span className="card__price">$2346</span>
        </div>

        {/* Details */}
        <div className="card__details">
         <p>Case diameter42 Millimetres
Band colourTwo tone
Band material typeStainless Steel
Warranty typeManufacturer
Watch movement typeQuartz
Item weight120 Grams
Country of OriginChina
</p>
        </div>

        {/* Description */}
        <p className="card__desc">
          Premium luxury watch with elegant design, durable stainless steel band,
          and water resistance. Perfect for business and casual wear.
        </p>

      </div>
    </div>
  )
}

export default CardDetails
import React from 'react'

// This is the component that renders the full product information
// only for use on the standalone product page

export const SingleProduct = ({name, description, price, photoURL}) => {
  return (
    <div>
      <h2>{name}</h2>
        <img src={photoURL} />
      <h3>{price}</h3>
      <p>{description}</p>
        <form>
          <input type="number" value="1"/>
          <button>Add to Cart</button>
        </form>
    </div>
  )
}
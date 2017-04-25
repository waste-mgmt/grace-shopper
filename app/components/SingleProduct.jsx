import React from 'react'

// This is the component that renders the full product information
// only for use on the standalone product page

export const SingleProduct = ({name, description, price, averageRating, photoURL, category}) => {
  return (
    <div>
      <h2>{name}</h2>
        <img src={photoURL} />
      <h3>{price}</h3>
      {/* OB/DY: still dead */}
      {/* <Link to={`/reviews/${props.selectedProduct.id}`}>{averageRating}</Link> */}
      <p>{description}</p>
        <form>
          <input type="number" value="1"/>
          <button>Add to Cart</button>
        </form>
    </div>
  )
}
  // Need to handle functionality for Add to cart button, as well as Link and general styling

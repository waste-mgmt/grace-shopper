import React from 'react'

// This is the component that renders the full product information
// not for use where product arrays will be rendered

export const Product = ({name, description, price, averageRating, photoURL, category}) => {

return (<div>
  <h2>{name}</h2>
    <img src={photoURL} />
  <h3>{price}</h3>
    {/*<Link to=REVIEWSPAGEFORTHISPRODUCT>{averageRating}</Link>*/}
  <p>{description}</p>
    <form>
      <input type="number" value="1"/>
    <button>Add to Cart</button>
    </form>
  </div>
)

}
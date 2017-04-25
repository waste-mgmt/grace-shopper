import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';

export class SingleProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = { // for placing an order
      name: props.name, // product's model: productName
      totalPrice: '', // 
      quantity: ''  // orderProduct model
    }

    this.rating = this.props.averageRating();
  }

  handleQuantityChange(event) {
    const quantity = parseInt(event.target.value);
    const totalPrice = quantity * this.props.product.price;

  }

  handleSubmit(event) {
    this.addToCart(this.state);
  }

// HOW DO YOU USE LINK???
  render () {

    const product = this.props.product;
    const nums = ['1','2','3','4','5','6','7','8','9','10'];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>{product.name}</label>
          <br />
          <label>Rating: {product.averageRating}</label>
          <img src={product.photo} />

          <button type='submit' value='ORDER xD' />
          <select onChange={handleQuantityChange} required>
            <option>Choose a Quantity XDDD</option>
            {
              nums.map(n => (<option key={n} value={n}>n</option>))
            }
          </select>
        </form>
        <div>
          {
            this.props.reviews && this.props.reviews.map(review => (
              <div key={product.reviews.id}>
                <label>{product.reviews.title}</label>
                <label>Rating: {reviews.rating}</label>
                <Link to='/user/:userId'>reviews.user.fullname</Link>
                <pre>{product.reviews.content}</pre>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

// pass down state relating to product
// pass down thunks that will 
const mapStateToProps = state => ({product: state.singleProduct});
const mapDispatchToProps = dispatch => ({addToCart});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
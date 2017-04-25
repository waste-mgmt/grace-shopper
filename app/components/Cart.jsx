import React from 'react'
import { connect } from 'react-redux'

// should this be dummy or smart ?
function Cart (props) {
  return (
    <div>
        {
          props.cart.length && props.cart.map(prod => {
            return (
              <div key={prod.product.id}>
                <Link to={`/products/${prod.product.id}}`}>
                  <p>{prod.product.name}</p>
                  <img src={prod.product.image} />
                  <p>${prod.product.price / 100}</p>
                  <p>{prod.quantity}</p>
                </Link>
              </div>
            )
          })
        }
      <button onClick={() => {
        submitCartToOrder(
          props.user,
          props.cart)
        }} />
    </div>
  )
}

const mapStateToProps = state => ({cart: state.cart, user: state.currentUser})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)


const submitCartToOrder = (user, cart) => {
  return axios.post('/api/orders', {user, cart})
}



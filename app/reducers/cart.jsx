import axios from 'axios'

const UPDATE_CART = 'UPDATE_CART'

const updatingCart = updatedCart => ({
  type: UPDATE_CART,
  updatedCart
})

const initialCartState = {}

export default function (state = initialCartState, action) {
  switch(action.type) {
    case UPDATE_CART:
      return action.updatedCart
      break;
    default:
      return state;
  }
}

export const updateCart = () => {
  // figure out sessions
}

import axios from 'axios'

const RECEIVE_CART = 'RECEIVE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

const receivingCart = receivedCart => ({
  type: RECEIVE_CART,
  receivedCart
})

const addingToCart = newProduct => ({
  type: ADD_TO_CART,
  newProduct
})

const removingFromCart = productToRemove => ({
  type: REMOVE_FROM_CART,
  productToRemove
})

const changingQuantity = productAndChangedQuantity => ({
  type: CHANGE_QUANTITY,
  productAndChangedQuantity
})

const initialCartState = []

export default function (state = initialCartState, action) {
  let newState = [...state] // make array with current state [...state]
  switch(action.type) {
    case RECEIVE_CART:
      return action.receivedCart
    case ADD_TO_CART:
      newState.push(action.newProduct) //object with qty = 1
      return newState;
    case REMOVE_FROM_CART:
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].product.id === action.productToRemove.id) {
          newState = newState.splice(i, 1)
        }
      }
      return newState;
    case CHANGE_QUANTITY:
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].product.id === action.productAndChangedQuantity.product.id) {
          newState[i].quantity = action.productAndChangedQuantity.quantity;
        }
      }
      return newState;
    default:
      return state;
  }
}

export const receiveCart = () => {
  // figure out sessions
}

export const addToCart = (product, quantity) => {
  return dispatch(addingToCart({product, quantity}))
}


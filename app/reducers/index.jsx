import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  allProducts: require('./all-products').default,
  allOrders: require('./all-orders-admin').default,
  allUserOrders: require('./all-orders-user').default,
  selectedOrder: require('./single-order').default,
  cart: require('./cart').default
})

export default rootReducer

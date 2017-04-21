import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  allProducts: require('./all-products').default,
})

export default rootReducer

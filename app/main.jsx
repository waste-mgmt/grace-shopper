'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios';

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import App from './components/App'
import AllProducts from './components/AllProducts'
import {onAllProducts} from './reducers/all-products'
import UserSetting from './components/UserSetting'
import AllOrders from './components/AllOrders'
import AllReviews from './components/AllReviews'
import AllUsers from './components/AllUsers'
<<<<<<< HEAD
import Cart from './components/Cart'
import SingleProduct from './components/SingleProduct'
import {getProduct} from './reducers/single-product'


const onProductEnter = (nextRouterState) => {
  const productId = nextRouterState.params.productId;
  store.dispatch(getProduct(productId))
}

=======
import {getUsers} from './reducers/all-users'
>>>>>>> 4767d98d0aed829b64aa5f0d61d40b37eb57d807

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRedirect to="/home" />
        <Route path="/home" component={AllProducts} onEnter={() => store.dispatch(onAllProducts)} />
        <Route path="/orders" component={AllOrders} />
        <Route path="/reviews" component={AllReviews} />
        <Route path="/user/:userId/setting" component={UserSetting}/>
<<<<<<< HEAD
        <Route path="/users" component={AllUsers} />
        <Route path="/cart" component={Cart} />
        <Route path="/products/:productId" component={SingleProduct} onEnter={onProductEnter} />
=======
        <Route path="/users" component={AllUsers} onEnter={() => store.dispatch(getUsers())} />
>>>>>>> 4767d98d0aed829b64aa5f0d61d40b37eb57d807
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

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
import {getUsers} from './reducers/all-users'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="/home" component={AllProducts} onEnter={() => store.dispatch(onAllProducts())} />
        <IndexRedirect to="/home" />
        <Route path="/orders" component={AllOrders} />
        <Route path="/reviews" component={AllReviews} />
        <Route path="/user/:userId/setting" component={UserSetting}/>
        <Route path="/users" component={AllUsers} onEnter={() => store.dispatch(getUsers())} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

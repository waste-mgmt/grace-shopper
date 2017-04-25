'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios';
// OB/DY: some dead code with unused dependencies
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



render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAllProducts}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={AllProducts} /> {/* OB/DY: could put the onEnter for loading products down here */}
        <Route path="/orders" component={AllOrders} />
        <Route path="/reviews" component={AllReviews} />
        <Route path="/user/:userId/setting" component={UserSetting}/>
        <Route path="/users" component={AllUsers} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

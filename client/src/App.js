import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// Store and actions
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './store/ducks/auth/actions'

// Components
import Navbar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

import './App.css'

if (localStorage.USER_TOKEN) {
  setAuthToken(localStorage.USER_TOKEN)
}

const App = () => {
  // Empty [] run once and not rely on any props
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App

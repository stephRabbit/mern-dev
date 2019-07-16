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
import Routes from './components/routing/Routes'


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
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App

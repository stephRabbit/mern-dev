import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({
  auth: { isAuth, loading },
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuth && !loading ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)

import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { loginUser } from '../../store/ducks/auth/actions'

const Login = ({ loginUser, isAuth }) => {
  const [fromData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = fromData

  const onChangeInput = e => {
    const el = e.target
    setFormData({ ...fromData, [el.name]: el.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    loginUser({ email, password })
  }

  if (isAuth) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Login To Your Account
      </p>
      <form onSubmit={onSubmit} className='form'>
        <div className='form-group'>
          <input
            value={email}
            onChange={onChangeInput}
            type='email'
            placeholder='Email'
            name='email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={onChangeInput}
            type='password'
            placeholder='Password'
            name='password'
            minLength='5'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Not a member? <Link to='/register'>Sign up</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)

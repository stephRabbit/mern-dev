import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setAlert } from '../../store/ducks/alert/actions'
import { registerUser } from '../../store/ducks/auth/actions'

const Register = ({ registerUser, setAlert, isAuth }) => {
  const [fromData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = fromData

  const onChangeInput = e => {
    const el = e.target
    setFormData({ ...fromData, [el.name]: el.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords do not match!', 'danger')
    } else {
      registerUser({ name, email, password })
    }
  }

  if (isAuth) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form onSubmit={onSubmit} className='form'>
        <div className='form-group'>
          <input
            value={name}
            onChange={onChangeInput}
            type='text'
            placeholder='Name'
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={email}
            onChange={onChangeInput}
            type='email'
            placeholder='Email Address'
            name='email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            value={password2}
            onChange={onChangeInput}
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='5'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch => ({
  registerUser: ({ name, email, password }) =>
    dispatch(registerUser({ name, email, password })),
  setAlert: (msg, type) => dispatch(setAlert(msg, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

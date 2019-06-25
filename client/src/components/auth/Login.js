import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [fromData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = fromData

  const onChangeInput = e => {
    const el = e.target
    setFormData({ ...fromData, [el.name]: el.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
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

export default Login

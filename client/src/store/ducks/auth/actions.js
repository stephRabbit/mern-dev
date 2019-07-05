import axios from 'axios'

import setAuthToken from '../../../utils/setAuthToken'
import { AuthTypes } from './types'
import { ProfileTypes } from '../profile/types'
import { setAlert } from '../alert/actions'

export const loadUser = () => async dispatch => {
  if (localStorage.USER_TOKEN) {
    setAuthToken(localStorage.USER_TOKEN)
  }

  try {
    const res = await axios.get('api/auth')
    dispatch({
      type: AuthTypes.USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: AuthTypes.AUTH_ERROR })
  }
}

export const registerUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('api/users', body, config)
    dispatch({
      type: AuthTypes.REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: AuthTypes.REGISTER_FAIL })
  }
}

export const loginUser = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('api/auth', body, config)
    dispatch({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: AuthTypes.LOGIN_FAIL })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: ProfileTypes.CLEAR_PROFILE })
  dispatch({ type: AuthTypes.LOGOUT })
}

export const accountDelete = () => async dispatch => {
  if (window.confirm('You sure? This can not be undone!')) {
    try {
      const res = await axios.delete('/api/profile')

      dispatch({ type: ProfileTypes.CLEAR_PROFILE })

      dispatch({
        type: AuthTypes.ACCOUNT_DELETE,
        payload: res.data
      })

      dispatch(setAlert('Your accout has been deleted'))
    } catch (err) {
      dispatch({
        type: ProfileTypes.PROFILE_ERROR,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status
        }
      })
    }
  }
}
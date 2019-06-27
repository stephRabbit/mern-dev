import axios from 'axios'

import setAuthToken from '../../../utils/setAuthToken'
import { AuthTypes } from './types'
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
  } catch (error) {
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
  } catch (error) {
    const errors = error.response.data.errors
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
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: AuthTypes.LOGIN_FAIL })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: AuthTypes.LOGOUT })
}
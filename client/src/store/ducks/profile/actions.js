import axios from 'axios'

import { ProfileTypes } from './types'
import { setAlert } from '../alert/actions'

export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me')
    dispatch({
      type: ProfileTypes.GET_PROFILE,
      payload: res.data
    })
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

export const createUpdateProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config)

    dispatch({
      type: ProfileTypes.GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Your profile has been updated': 'Your profile has been created', 'success'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    })
  }
}

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config)

    dispatch({
      type: ProfileTypes.UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience added!', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    })
  }
}

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config)

    dispatch({
      type: ProfileTypes.UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education added!', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    })
  }
}

import axios from 'axios'

import { ProfileTypes } from './types'
// import { setAlert } from '../alert/actions'

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

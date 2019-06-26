import uuid from 'uuid'
import { AlertTypes } from './types'


export const setAlert = (msg, alertType, time = 5000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: AlertTypes.SET_ALERT,
    payload: {
      id,
      msg,
      alertType
    }
  })

  setTimeout(() => dispatch({
    type: AlertTypes.REMOVE_ALERT,
    payload: id
  }), time)
}

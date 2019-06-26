import { AlertTypes } from './types'

/**
 * Alert shape:
 * { id: number, msg: string, alertType: string }
 */
const INITIAL_STATE = []

const alert = (state = INITIAL_STATE, action) => {
  const { payload, type } = action

  switch (type) {
    case AlertTypes.SET_ALERT:
      return [
        ...state,
        payload
      ]
    case AlertTypes.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload)
    default:
      return state
  }
}

export default alert

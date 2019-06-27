import { AuthTypes } from './types'

const INITIAL_STATE = {
  token: localStorage.getItem('USER_TOKEN'),
  isAuth: null,
  loading: true,
  user: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload
      }
    case AuthTypes.REGISTER_SUCCESS:
      localStorage.setItem('USER_TOKEN', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false
      }
    case AuthTypes.REGISTER_FAIL:
    case AuthTypes.AUTH_ERROR:
        localStorage.removeItem('USER_TOKEN')
        return {
          ...state,
          token: null,
          isAuth: false,
          loading: false
        }
    default:
      return state
  }
}

export default reducer

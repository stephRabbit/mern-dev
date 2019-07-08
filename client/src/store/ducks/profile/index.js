import { ProfileTypes } from './types'

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileTypes.GET_PROFILE:
    case ProfileTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case ProfileTypes.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case ProfileTypes.GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      }
    case ProfileTypes.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case ProfileTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
        error: {}
      }
    default:
      return state
  }
}

export default reducer

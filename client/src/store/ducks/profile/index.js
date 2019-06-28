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
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default reducer

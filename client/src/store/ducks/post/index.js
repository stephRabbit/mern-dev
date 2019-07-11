import { PostTypes } from './types'
const INITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case PostTypes.POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default reducer
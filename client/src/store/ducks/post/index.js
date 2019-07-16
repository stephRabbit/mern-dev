import { PostTypes } from './types'
const INITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      }
    case PostTypes.ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false
      }
    case PostTypes.REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== action.payload
          )
        },
        loading: false
      }
    case PostTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case PostTypes.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case PostTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false
      }
    case PostTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
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

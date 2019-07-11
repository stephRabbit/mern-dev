import axios from 'axios'
import { PostTypes } from './types'
import { setAlert } from '../alert/actions'

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('api/posts')
    dispatch({
      type: PostTypes.GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    })
  }
}
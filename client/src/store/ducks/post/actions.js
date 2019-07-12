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

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`api/posts/like/${id}`)
    dispatch({
      type: PostTypes.UPDATE_LIKES,
      payload: {
        id,
        likes: res.data
      }
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

export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`api/posts/unlike/${id}`)
    dispatch({
      type: PostTypes.UPDATE_LIKES,
      payload: {
        id,
        likes: res.data
      }
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

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`api/posts/${id}`)
    dispatch({
      type: PostTypes.DELETE_POST,
      payload: id
    })
    dispatch(setAlert('Post deleted!', 'success'))
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
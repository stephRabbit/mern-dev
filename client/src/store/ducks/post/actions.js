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

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`)

    dispatch({
      type: PostTypes.GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
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

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('api/posts', formData, config)
    dispatch({
      type: PostTypes.ADD_POST,
      payload: res.data
    })
    dispatch(setAlert('Post created!', 'success'))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    })
  }
}

export const addComment = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = axios.post(`api/posts/comment/${id}`, formData, config)
    dispatch({
      type: PostTypes.ADD_COMMENT,
      payload: res.data
    })
    dispatch(setAlert('Comment added!', 'success'))
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

export const removeComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: PostTypes.REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert('Comment Removed', 'success'))
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

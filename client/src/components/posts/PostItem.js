import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { addLike, deletePost, removeLike } from '../../store/ducks/post/actions'

const PostItem = ({
  addLike,
  auth,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
  removeLike
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='User avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button onClick={e => addLike(_id)} type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-up' />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button onClick={e => removeLike(_id)} type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-down' />
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && auth.user._id === user && (
          <button onClick={e => deletePost(_id)} type='button' className='btn btn-danger'>
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  removeLike:  PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {addLike, deletePost, removeLike}
)(PostItem)

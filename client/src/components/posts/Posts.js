import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getPosts } from '../../store/ducks/post/actions'
import Spinner from '../layout/Spinner'
import PostForm from './PostForm'
import PostItmem from './PostItem'

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  if (loading) {
    return <Spinner />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community!
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItmem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)

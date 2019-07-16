import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addComment } from '../../../store/ducks/post/actions'

const CommentForm = ({ addComment, postId }) => {
  console.log()
  const [formData, setFormData] = useState({
    text: ''
  })

  const { text } = formData

  const onInputChange = e => {
    const el = e.target
    setFormData({ ...formData, [el.name]: el.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    addComment(postId, formData)
    setFormData({ ...formData, text: '' })
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form onSubmit={onSubmit} className='form my-1'>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          value={text}
          onChange={onInputChange}
        />
        <input
          disabled={!text}
          type='submit'
          className='btn btn-dark my-1'
          value='Submit'
        />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

export default connect(
  null,
  { addComment }
)(CommentForm)

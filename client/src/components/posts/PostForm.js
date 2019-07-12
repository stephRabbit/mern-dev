import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addPost } from '../../store/ducks/post/actions'

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    test: false,
    text: ''
  })

  const { text } = formData

  const onInputChange = e => {
    const el = e.target
    setFormData({ ...formData, [el.name]: el.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    addPost(formData)
    setFormData({ ...formData, text: '' })
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
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
          disabled={!text ? 'disabled' : ''}
          type='submit'
          className='btn btn-dark my-1'
          value='Submit'
        />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { addPost }
)(PostForm)

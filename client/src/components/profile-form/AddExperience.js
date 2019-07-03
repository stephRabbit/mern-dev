import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { addExperience } from '../../store/ducks/profile/actions'

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: ''
  })

  const [toDateDisabled, toggleToDateDisabled] = useState(false)

  const { title, company, location, from, current, to, description } = formData

  const onInputChange = e => {
    const el = e.target
    setFormData({ ...formData, [el.name]: el.value })
  }

  const onCheckChange = e => {
    setFormData({ ...formData, current: !current })
    toggleToDateDisabled(!toDateDisabled)
  }

  const onSubmit = e => {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>*required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            value={title}
            onChange={onInputChange}
            type='text'
            placeholder='* Job Title'
            name='title'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={company}
            onChange={onInputChange}
            type='text'
            placeholder='* Company'
            name='company'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={location}
            onChange={onInputChange}
            type='text'
            placeholder='Location'
            name='location'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            value={from}
            onChange={onInputChange}
            type='date'
            name='from'
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              value={current}
              onChange={onCheckChange}
              type='checkbox'
              name='current'
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            value={to}
            onChange={onInputChange}
            type='date'
            name='to'
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            value={description}
            onChange={onInputChange}
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    null,
    { addExperience }
  )(AddExperience)
)

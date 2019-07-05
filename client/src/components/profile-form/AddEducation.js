import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addEducation } from '../../store/ducks/profile/actions'

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    current: false,
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    description: ''
  })

  const [toDateDisabled, toggleToDateDisabled] = useState(false)

  const {
    current,
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description
  } = formData

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
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            value={school}
            onChange={onInputChange}
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={degree}
            onChange={onInputChange}
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={fieldofstudy}
            onChange={onInputChange}
            type='text'
            placeholder='* Field Of Study'
            name='fieldofstudy'
          />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input
            value={from}
            onChange={onInputChange}
            type='date'
            name='from'
            required
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
            Current School
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
            placeholder='Program Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    null,
    { addEducation }
  )(AddEducation)
)

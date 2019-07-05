import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { deleteExperience } from '../../store/ducks/profile/actions'

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : ' Now'}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {deleteExperience(exp._id)}}
        >
          Delete
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
}

export default connect(
  null,
  { deleteExperience }
)(Experience)

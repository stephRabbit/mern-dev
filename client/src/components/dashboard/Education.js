import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { deleteEducation } from '../../store/ducks/profile/actions'

const Education = ({ education, deleteEducation }) => {
  const studies = education.map(ed => (
    <tr key={ed._id}>
      <td>{ed.school}</td>
      <td className='hide-sm'>{ed.degree}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{ed.from}</Moment> -{' '}
        {ed.to ? <Moment format='YYYY/MM/DD'>{ed.to}</Moment> : ' Now'}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {deleteEducation(ed._id)}}
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
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{studies}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired
}

export default connect(
  null,
  { deleteEducation }
)(Education)

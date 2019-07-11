import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileEducation = ({
  education: { school, from, to, degree, fieldofstudy, description }
}) => (
  <div>
    <h3>{school}</h3>
    <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
      {to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : ' Now'}
    </p>
    <p>
      <strong>Degree: </strong>
      {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong>
      {fieldofstudy}
    </p>
    {description && (
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    )}
  </div>
)

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation

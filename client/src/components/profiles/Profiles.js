import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getAllProfiles } from '../../store/ducks/profile/actions'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles()
  }, [getAllProfiles])

  if (loading) {
    return <Spinner />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'>
          {' '}
          Browse and connect with developers
        </i>
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </Fragment>
  )
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Profiles)

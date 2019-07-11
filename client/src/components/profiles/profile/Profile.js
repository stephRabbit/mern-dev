import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProfileById } from '../../../store/ducks/profile/actions'
import Spinner from '../../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({
  getProfileById,
  isAuth,
  match,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  if (!profile || loading) {
    return <Spinner />
  }

  return (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {!isAuth.loading && isAuth.user && isAuth.user._id === match.params.id && (
        <Link to='/edit-profile' className='btn btn-light'>
          Edit Profile
        </Link>
      )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile.experience.length > 0 ? (
            profile.experience.map(experience => (
              <ProfileExperience key={experience._id} experience={experience} />
            ))
          ) : (
            <h4>No experience added</h4>
          )}
        </div>
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile.experience.length > 0 ? (
            profile.education.map(education => (
              <ProfileEducation key={education._id} education={education} />
            ))
          ) : (
            <h4>No Education added</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  isAuth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  isAuth: state.auth
})

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile)

import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getProfile } from '../../store/ducks/profile/actions'
import DashboardAction from './DashboardAction'

import Spinner from '../layout/Spinner'

const Dashboard = ({
  auth: { user },
  getProfile,
  profile: { loading, profile }
}) => {
  useEffect(() => {
    getProfile()
  }, [getProfile])

  return loading && !profile ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {!!profile ? (
        <Fragment>
          <DashboardAction />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not set up a profile, setup one up!</p>
          <Link className='btn btn-primary my-1' to='create-profile'>
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getProfile }
)(Dashboard)

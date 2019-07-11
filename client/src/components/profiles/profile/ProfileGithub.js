import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getUserRepos } from '../../../store/ducks/profile/actions'
import Spinner from '../../layout/Spinner'
const ProfileGithub = ({ getUserRepos, username, repos }) => {
  useEffect(() => {
    getUserRepos(username)
  }, [getUserRepos, username])

  if (!repos) {
    return <Spinner />
  }

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github' /> Github Repos
      </h2>
      {repos.map(repo => (
        <div key={repo.id} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            {repo.description && <p>{repo.description}</p>}
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
              <li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
              <li className='badge badge-light'>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

ProfileGithub.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(
  mapStateToProps,
  { getUserRepos }
)(ProfileGithub)

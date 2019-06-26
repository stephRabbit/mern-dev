import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = ({ alerts }) =>
  alerts &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
      {alert.msg}
    </div>
  ))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = ({ alert }) => ({
  alerts: alert
})

export default connect(mapStateToProps)(Alert)

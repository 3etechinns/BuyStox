import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchingPastTransactions} from '../store'

/**
 * COMPONENT
 */

class Transactions extends Component {
  componentDidMount() {
    const {user} = this.props
    this.props.loadingPastTransactions(user.id)
  }

  render() {
    const {transactions} = this.props
    console.log('TRANSACTIONS: ', transactions)
    return (
      <div>
        <h3>Past Transactions</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    transactions: state.portfolio.pastTransactions
  }
}

const mapDispatch = dispatch => {
  return {
    loadingPastTransactions: userId => {
      dispatch(fetchingPastTransactions(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Transactions)

/**
 * PROP TYPES
 */
Transactions.propTypes = {
  user: PropTypes.object,
  transactions: PropTypes.array
}

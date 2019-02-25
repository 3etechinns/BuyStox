import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchingPastTransactions} from '../store'
import StockTable from './stockTable'

/**
 * COMPONENT
 */

class Transactions extends Component {
  componentDidMount() {
    const {user} = this.props
    this.props.loadingPastTransactions(user.id)
  }

  render() {
    const {transactions, stockInfo} = this.props

    return (
      <div>
        <h3>Past Transactions</h3>
        <StockTable
          headerArr={[
            'Stock',
            'Name',
            'Qty',
            'Price',
            'Total',
            'Transaction Type'
          ]}
          stockDataArr={transactions}
          stockInfo={stockInfo}
        />
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
    transactions: state.portfolio.pastTransactions,
    stockInfo: state.portfolio.stockInfo
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

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchingPortfolio} from '../store'
import StockTable from './stockTable'
import TradeForm from './tradeform'

/**
 * COMPONENT
 */

class PortfolioPage extends Component {
  componentDidMount() {
    const {user} = this.props
    this.props.loadingPortfolio(user.id)
  }

  render() {
    const {currentStocks, stockInfo} = this.props

    return (
      <div>
        <h3>Portfolio</h3>
        <StockTable
          headerArr={['Stock', 'Name', 'Qty', 'Price', 'Total']}
          stockDataArr={currentStocks}
          stockInfo={stockInfo}
          type="current"
        />
        <TradeForm />
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
    currentStocks: state.portfolio.currentStocks,
    stockInfo: state.portfolio.stockInfo
  }
}

const mapDispatch = dispatch => {
  return {
    loadingPortfolio: userId => {
      dispatch(fetchingPortfolio(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(PortfolioPage)

/**
 * PROP TYPES
 */
PortfolioPage.propTypes = {
  user: PropTypes.object,
  currentStocks: PropTypes.array,
  stockInfo: PropTypes.object
}

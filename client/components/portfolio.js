import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchingPortfolio, fetchingLatestStockInfo} from '../store'

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
        <table>
          <tbody>
            <tr>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {currentStocks.length &&
              currentStocks.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.stock}</td>
                    <td>{item.quantity}</td>
                    <td>{stockInfo[item.stock].quote.latestPrice}</td>
                    <td>
                      {item.quantity * stockInfo[item.stock].quote.latestPrice}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
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

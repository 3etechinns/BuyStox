import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchingStockDetail, commenceStockTrade} from '../store'

class TradeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      qty: 0,
      transaction: 'buy'
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchStock = this.searchStock.bind(this)
    this.handleTrade = this.handleTrade.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  searchStock(event) {
    event.preventDefault()
    this.props.searchStockDetails(this.state.ticker)
  }

  handleTrade(event) {
    event.preventDefault()
    this.props.tradingStock(this.state, this.props.user.id)
  }

  render() {
    const {user, stockLookUp} = this.props
    console.log('STOCK LOOK UP: ', stockLookUp)
    return (
      <div>
        <h3>Trade Form</h3>
        <h5>Account Balance: ${user.accountBalance / 100}</h5>
        <form onSubmit={this.handleTrade}>
          <label>
            Stock Ticker:<input
              type="text"
              name="ticker"
              value={this.state.ticker}
              onChange={this.handleChange}
            />{' '}
          </label>
          <button type="submit" onClick={this.searchStock}>
            search
          </button>{' '}
          <label>
            Quantity:<input
              name="qty"
              type="number"
              value={this.state.qty}
              onChange={this.handleChange}
            />
          </label>
          <label>
            I would like to:<select
              name="transaction"
              value={this.state.transaction}
              onChange={this.handleChange}
            >
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        {stockLookUp[this.state.ticker] && (
          <p>
            Total Price:{' '}
            {this.state.qty * stockLookUp[this.state.ticker].quote.latestPrice}
          </p>
        )}
        {stockLookUp[this.state.ticker] && (
          <div>
            <h5>
              Company Name: {stockLookUp[this.state.ticker].quote.companyName}
            </h5>
            <h5>
              Current Price: {stockLookUp[this.state.ticker].quote.latestPrice}
            </h5>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    stockLookUp: state.trading.currentStock
  }
}

const mapDispatch = dispatch => {
  return {
    searchStockDetails: ticker => {
      dispatch(fetchingStockDetail(ticker))
    },
    tradingStock: (stock, userId) => {
      dispatch(commenceStockTrade(stock, userId))
    }
  }
}

export default connect(mapState, mapDispatch)(TradeForm)

TradeForm.propTypes = {
  user: PropTypes.object,
  stockLookUp: PropTypes.object
}

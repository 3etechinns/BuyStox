import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const GET_PAST_TRANSACTIONS = 'GET_PAST_TRANSACTIONS'

/**
 * ACTION CREATORS
 */
const getPortfolio = (currentStocks, stockInfo) => ({
  type: GET_PORTFOLIO,
  currentStocks,
  stockInfo
})

const getPastTransactions = (pastTransactions, stockInfo) => ({
  type: GET_PAST_TRANSACTIONS,
  pastTransactions,
  stockInfo
})

/**
 * THUNK CREATORS
 */
export const fetchingPortfolio = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/portfolio`)
    const portfolio = res.data

    const tickers = portfolio.map(elem => elem.stock)
    const {data} = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`
    )
    dispatch(getPortfolio(portfolio, data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchingPastTransactions = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/transactions`)
    const transactions = res.data

    const tickers = transactions.map(elem => elem.stock)
    const {data} = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`
    )
    dispatch(getPastTransactions(transactions, data))
  } catch (err) {
    console.err(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultPortfolio = {
  currentStocks: [],
  stockInfo: {},
  pastTransactions: []
}

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {
        ...defaultPortfolio,
        currentStocks: action.currentStocks,
        stockInfo: action.stockInfo
      }
    case GET_PAST_TRANSACTIONS:
      return {
        ...defaultPortfolio,
        pastTransactions: action.pastTransactions,
        stockInfo: action.stockInfo
      }
    default:
      return state
  }
}

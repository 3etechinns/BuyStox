import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_STOCK_DETAILS = 'GET_STOCK_DETAILS'
const TRADE_STOCK = 'TRADE_STOCK'

/**
 * ACTION CREATORS
 */
const getStockDetails = stock => ({
  type: GET_STOCK_DETAILS,
  stock
})

const tradedStock = stock => ({
  type: TRADE_STOCK,
  stock
})

/**
 * THUNK CREATORS
 */

export const fetchingStockDetail = ticker => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote,news,chart&range=1m&last=5`
    )
    dispatch(getStockDetails(data))
  } catch (err) {
    console.error(err)
  }
}

export const commenceStockTrade = (stock, userId) => async dispatch => {
  try {
    //post/update transactions + portfolio
    const trade = await axios.post(
      `/api/trading/user/${userId}/portfolio`,
      stock
    )
    console.log('trade in trading thunk: ', trade)
    dispatch(tradedStock(trade.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultTrading = {
  currentStock: {}
}

/**
 * REDUCER
 */
export default function(state = defaultTrading, action) {
  switch (action.type) {
    case GET_STOCK_DETAILS:
      return {
        ...defaultTrading,
        currentStock: action.stock
      }
    default:
      return state
  }
}

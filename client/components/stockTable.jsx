import React from 'react'

const StockTable = props => (
  <div>
    <table>
      <tbody>
        <tr>
          {props.headerArr.length &&
            props.headerArr.map(header => {
              return <th key={header}>{header}</th>
            })}
        </tr>
        {props.stockDataArr.length &&
          props.stockDataArr.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.stock}</td>
                <td>{props.stockInfo[item.stock].quote.companyName}</td>
                <td>{item.quantity}</td>
                {/* ---------------------------- */}
                {props.type ? (
                  <td>{props.stockInfo[item.stock].quote.latestPrice}</td>
                ) : (
                  <td>{item.price}</td>
                )}
                {/* ---------------------------- */}
                {props.type ? (
                  <td>
                    {item.quantity *
                      props.stockInfo[item.stock].quote.latestPrice}
                  </td>
                ) : (
                  <td>{item.quantity * item.price}</td>
                )}
                {/* ---------------------------- */}
                {!props.type && <td>{item.tradeType}</td>}
                {/* ---------------------------- */}
              </tr>
            )
          })}
      </tbody>
    </table>
  </div>
)

export default StockTable

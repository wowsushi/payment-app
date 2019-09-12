import React from 'react'

const LineSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>LINE Pay付款：940元</td>
          <td>LINE Point折抵：65元</td>
          <td>手續費：0元</td>
          <td colSpan="2">狀態：已完成付款</td>
        </tr>
      </tbody>
    </table>
  )
}

export default LineSuccess

import React from 'react'

const CreditSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>信用卡刷卡：940元</td>
          <td>手續費：0元</td>
          <td colSpan="3">狀態：已完成付款</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CreditSuccess

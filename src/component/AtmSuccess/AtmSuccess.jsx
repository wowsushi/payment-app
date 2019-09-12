import React from 'react'

const AtmSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>Web ATM付款：940元</td>
          <td>付款銀行：玉山銀行</td>
          <td>手續費：15元</td>
          <td colSpan="2">狀態：已完成付款</td>
        </tr>
      </tbody>
    </table>
  )
}

export default AtmSuccess

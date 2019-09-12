import React from 'react'

import ShopSuccess from '../ShopSuccess'
import CreditSuccess from '../CreditSuccess'
import LineSuccess from '../LineSuccess'
import AtmSuccess from '../AtmSuccess'

const OrderDetail = props => {
  const { selectedShop, prevPath } = props

  return(
    <section className="order-detail">
      <div className="inner-wrapper">
        <table>
          <caption>訂單資訊 (JC293016)</caption>
          <thead>
            <tr>
              <th scope="col">品項</th>
              <th scope="col">數量</th>
              <th scope="col">顏色</th>
              <th scope="col" colSpan="2">價格</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>長版無袖洋裝</td>
              <td>1</td>
              <td>綠色</td>
              <td colSpan="2">599元</td>
            </tr>
            <tr>
              <td>大球氣質銀飾耳環(針式)</td>
              <td>1</td>
              <td>紅色</td>
              <td colSpan="2">281元</td>
            </tr>
            <tr>
              <td colSpan="4">運費</td>
              <td>60元</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">共2品項，總計</td>
              <td className="total">NT$ 940</td>
            </tr>
          </tfoot>
        </table>
        <table>
          <caption>取貨資訊</caption>
          <tbody>
            <tr>
              <td>取貨店名</td>
              <td colSpan="4">{selectedShop.name}</td>
            </tr>
            <tr>
              <td>取貨地址</td>
              <td colSpan="4">{selectedShop.address}</td>
            </tr>
          </tbody>
        </table>
        {prevPath.pathname.includes('shop')? <ShopSuccess/> : ''}
        {prevPath.pathname.includes('credit')? <CreditSuccess/> : ''}
        {prevPath.pathname.includes('line')? <LineSuccess/> : ''}
        {prevPath.pathname.includes('union')? <CreditSuccess/> : ''}
        {prevPath.pathname.includes('atm')? <AtmSuccess/> : ''}
      </div>
    </section>
  )
}

export default OrderDetail

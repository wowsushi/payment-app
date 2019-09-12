import React from 'react'

const OrderPanel= () => {
  return (
    <section className="order-panel">
      <div className="inner-wrapper">
        <div className="order-title">
          <span>訂單明細</span>
          <span>(JC293016)</span>
        </div>
        <div className="subtotal">
          <span>商品小計</span>
          <span>NT$ 880</span>
        </div>
        <div className="freight">
          <span>運費</span>
          <span>NT$ 60</span>
        </div>
        <div className="total">
          <span>總金額</span>
          <span>NT$ 940</span>
        </div>
      </div>
    </section>
  )

}

export default OrderPanel

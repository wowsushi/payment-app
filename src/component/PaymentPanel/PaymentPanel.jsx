
import React from 'react'

const PaymentPanel = props => {
  const { selectPayment, paymentType} = props

  return (
    <ul className="payment-panel" >
      {paymentType.map((payment, index) => {
        return (
          <li className="payment-card" key={index} onClick={selectPayment(index)}>
            <input type="radio" id={payment.type} name="payment-card" value={payment.type}/>
            <label htmlFor={payment.type} >
              <span></span>
              <img src={payment.img} alt={payment.type} />
              <h4>{payment.title}</h4>
              <p>{payment.content}</p>
            </label>
          </li>
        )
      })}
    </ul>
  )

}


export default PaymentPanel

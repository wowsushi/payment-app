import React from 'react'

import { paymentType } from '../../constant'

const PaymentTerm = props => {
  const { routeProps } = props
  const term = routeProps.location.pathname.slice(routeProps.location.pathname.indexOf('/', 1) +1)

  return (
    <section className="payment-term">
      {paymentType.map(payment => {
        if (payment.type === term) {
          return (
            <React.Fragment key={payment.type}>
              <img src={payment.img} alt={payment.type}/>
              <h3>{payment.title}</h3>
              {routeProps.location.pathname.includes('line') && <p>將於下一步跳轉至LINE Pay進行付款</p> }
            </React.Fragment>
          )
        }
        return null
      })}

    </section>
  )
}

export default PaymentTerm

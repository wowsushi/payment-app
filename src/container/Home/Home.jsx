import React from 'react'

import OrderPanel from '../../component/OrderPanel'
import PaymentPanel from '../../component/PaymentPanel'
import RemarksPanel from '../../component/RemarksPanel'
import Goto from '../../component/Goto'
import { paymentType, remarks } from '../../constant'

class Home extends React.Component {
  componentDidMount() {
    this.props.clearData('selectedPayment')
  }

  render() {
    const {selectedPayment, selectPayment, handleSubmit, routeProps} = this.props

    return (
      <React.Fragment>
        <OrderPanel />
        {!selectedPayment.title && <span className='alert'>請選擇付款方式</span>}
        <PaymentPanel
          selectedPayment={selectedPayment}
          selectPayment={selectPayment}
          paymentType={paymentType}
        />
        <RemarksPanel remarks={remarks.slice(0)}/>
        <Goto
          forward={`/checkOut/${selectedPayment.type}`}
          backward="/"
          handleSubmit={handleSubmit}
          routeProps={routeProps}
        />
      </React.Fragment>
    )
  }
}

export default Home

import React from 'react'
import { Route } from 'react-router-dom'

import OrderPanel from '../../component/OrderPanel'
import PaymentTerm from '../../component/PaymentTerm'
import ShopInfo from '../../component/ShopInfo'
import AtmInfo from '../../component/AtmInfo'
import CreditInfo from '../../component/CreditInfo'
import BuyerInfo from '../../component/BuyerInfo'
import ReceiverInfo from '../../component/ReceiverInfo'
import RemarksPanel from '../../component/RemarksPanel'
import Goto from '../../component/Goto'
import { remarks } from '../../constant'


class ShopPayment extends React.Component {
  componentWillUnmount() {
    this.props.clearData('form')
  }

  render() {
    const {
      selectedPayment,
      form,
      handleValueChange,
      routeProps,
      formatCredit,
      selectedShop,
      selectShop,
      form: {termConfirm},
      handleSubmit
    } = this.props

    return (
      <React.Fragment>
        <OrderPanel />
        <PaymentTerm
          selectedPayment={selectedPayment}
          routeProps={routeProps}
        />
        <form>
          <Route
            path="/checkOut/shop"
            render={props => (
              <ShopInfo
                selectedShop={selectedShop}
                selectShop={selectShop}
              />
            )}
          />
          <Route path="/checkOut/atm" component={AtmInfo}/>
          <Route
            path="/checkOut/credit"
            render={props => (
              <CreditInfo
                form={form}
                handleValueChange={handleValueChange}
                formatCredit={formatCredit}
              />
            )}
          />
          <BuyerInfo
            form={form}
            handleValueChange={handleValueChange}
          />
          <ReceiverInfo />
          <RemarksPanel
            remarks={
              remarks
                .slice(0,1)
                .concat(remarks.slice(
                3, remarks.length
              ))}
            />
          <div className="form-row">
              <input
                type="checkbox"
                id="termConfirm"
                onChange={(e) => handleValueChange('termConfirm', e.target.checked)}
              />
              <label htmlFor="termConfirm" className="termConfirm">確認，我已暸解</label>
              {!termConfirm.valid && <span className="invalid-feedback">{termConfirm.error}</span>}
          </div>
          <Goto
            forward="/orderSuccess"
            backward="/"
            handleSubmit={handleSubmit}
            routeProps={routeProps}
          />
        </form>
      </React.Fragment>
    )
  }
}

export default ShopPayment

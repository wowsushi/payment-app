import React from 'react'
import { withRouter } from 'react-router-dom'

import SuccessMsg from '../../component/SuccessMsg'
import OrderDetail from '../../component/OrderDetail'
import Goto from '../../component/Goto'

const OrderSuccess = props => {
  const { selectedShop, prevPath, handleSubmit, routeProps, history } = props
  if (!prevPath) {
    history.replace('/')
    return null
  }

  return (
    <React.Fragment>
      <SuccessMsg
        header={"訂購成功！"}
        content={"感謝您的訂購，我們將儘速為您出貨！"}
      />
      <OrderDetail
        selectedShop={selectedShop}
        prevPath={prevPath}
      />
      <Goto
        forward="/"
        backward="/"
        forwardContent="返回首頁"
        backwardContent="會員專區"
        handleSubmit={handleSubmit}
        routeProps={routeProps}
      />
    </React.Fragment>
  )

}

export default withRouter(OrderSuccess)

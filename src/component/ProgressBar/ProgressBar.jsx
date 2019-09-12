import React from 'react'

const ProgressBar = props => {
  const { pathname } = props.routerProps.location

  return (
    <ul className="progress-bar">
      <li>
        <img
          src="./img/icon_step_done.svg"
          alt="cart confirm"/>
        <h4
          className="passed"
        >確認購物車</h4>
      </li>
      <li>
        <img src="./img/icon_arrow.svg" alt="arrow"/>
      </li>
      <li>
        <img
          src={(pathname.includes('orderSuccess'))? "./img/icon_step_done.svg" : "./img/icon_step2.svg"  }
          alt="payment confirm"/>
        <h4
          className={pathname.includes('orderSuccess')? 'passed hide' : undefined }
        >
          選擇配送付款方式
        </h4>
      </li>
      <li>
        <img src="./img/icon_arrow.svg" alt="arrow"/>
      </li>
      <li>
        <img
          src={(pathname.includes('orderSuccess'))? "./img/icon_step_done.svg" : "./img/icon_step3.svg"}
          alt="order confirm"/>
        <h4
          className={pathname.includes('orderSuccess')? 'passed' : 'pending hide' }
        >確認訂購</h4>
      </li>
    </ul>
  )
}


export default ProgressBar

import React from 'react'
import {
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import './stylesheet.scss'

const remarks = [
  '請確認您填寫的資料是否正確，一旦訂單完成後，付款與物流方式皆無法修改。',
  '使用ATM轉帳，將依據銀行入帳日，依序進行出貨/排貨。',
  '每筆訂單所提供的「ATM專屬虛擬帳號」皆不同，若您欲使用本項服務，敬請放心進行匯款作業，安全又便利！',
  '若訂單內含預購、無庫存商品調貨時間請參考「商品平均調貨時間」。',
  '若您對取貨或付款的方式有疑問，請詳閱「購買說明」。',
  '請確認您已詳閱並瞭解本站「購買說明」內容，訂單完成即表示您已同意其中的各項說明。'
]

const paymentType = [{
    type: 'shop',
    title: '超商取貨 付款',
    content: '24隔日取貨說明',
    img: './img/icon_store.svg'
  }, {
    type: 'credit',
    title: '信用卡 付款',
    content: 'VISA, Master, JCB, 聯合信用卡',
    img: './img/icon_card.svg'
  }, {
    type: 'line',
    title: 'LINE Pay 付款',
    content: '使用line point折抵消費',
    img: './img/line_pay.svg'
  }, {
    type: 'union',
    title: '銀聯卡 付款',
    content: '支付成功頁面僅為銀聯卡回覆訊息，交易是否完成請需以本商店通知為準',
    img: '/img/unionpay.png'
  }, {
    type: 'atm',
    title: 'Web ATM 付款',
    content: '網路銀行ATM操作說明',
    img: '/img/icon_atm.svg'
  }
]

const BtnWithDescription = props => {
  return (
    <button
      className={`btn-des ${props.className}`}
    >
      <img src={props.img} />
      <p>{props.content}</p>
    </button>
  )
}

const TopBar = () => {
  return (
    <section className="banner">
      <img src="./img/logo.svg" alt="payment-title"/>
    </section>
  )
}

const ProgressBar = props => {
  const { pathname } = props.routerProps.location
  console.log('bar', pathname)
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
          className={pathname.includes('orderSuccess') && 'passed hide' }
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

const PaymentPanel = props => {
  const {selectedPayment, selectPayment, paymentType} = props

  return (
    <ul className="payment-panel" >
      {paymentType.map((payment, index) => {
        return (
          <li className="payment-card" key={index} onClick={selectPayment(index)}>
            <input type="radio" id={payment.type} name="payment-card" value={payment.type}/>
            <label for={payment.type} >
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

class RemarksPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { remarks } = this.props
    let remarkList = []

    remarks.map(remark => {
      const targetPos = remark.indexOf('「購買說明」')

      if (targetPos > 1) {
        remarkList.push(
          <li>{remark.slice(0, targetPos) }{<a href="/">「購買說明」</a>}{remark.slice(targetPos + 6, remark.length)}</li>
        )
      } else {
        remarkList.push(
          <li>{remark}</li>
        )
      }
    })

    return(
      <section className="remarks-panel">
        <ul>
          {remarkList}
        </ul>
        <img src="./img/icon_notice.svg" alt="notice"/>
      </section>
    )
  }
}

const Goto = props => {
  const { forward, forwardContent, backward, backwardContent, validate, handleSubmit, routeProps} = props

  return (
    <section className="goto">
      <Link to={backward}><button class="btn" >{backwardContent || '上一步'}</button></Link>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={handleSubmit(forward, routeProps)}
      >
        {forwardContent || '下一步'}
      </button>
    </section>
  )
}

const PaymentTerm = props => {
  const { selectedPayment, routeProps } = props
  const term = routeProps.location.pathname.slice(routeProps.location.pathname.indexOf('/', 1) +1)

  return (
    <section className="payment-term">
      {paymentType.map(payment => {
        if (payment.type === term) {
          return (
            <React.Fragment>
              <img src={payment.img} alt={payment.type}/>
              <h3>{payment.title}</h3>
              {routeProps.location.pathname.includes('line') && <p>將於下一步跳轉至LINE Pay進行付款</p> }
            </React.Fragment>
          )
        }
      })}

    </section>
  )
}

const ShopInfo = props => {
  const {selectedShop, selectShop} = props

  return (
    <section className="shop-info">
      <div className="shop-title-bar">
        <div className="shop-title">
          <h3>選擇取貨門市</h3>
          <img src="./img/logo_family.png" alt="family mart"/>
        </div>
        <div className="shop-select">
          <div className="dropdown-menu">
            <BtnWithDescription
              content="選擇取貨門市"
              className="font-color-light"
              img="./img/icon_add.svg"
              />
          </div>
          <div className="dropdown-menu fav-shop">
            <div
              className="dropdown-item"
              onClick={e => selectShop(e)}
            >
              <ul
                className="inner"

              >
                <li>
                  <h4>南山</h4>
                  <p>台北市大安區復興路999段99號1巷</p>
                </li>
                <li>
                  <h4>台北車站</h4>
                  <p>台北市大安區復興路999段99號1巷</p>
                </li>
                <li>
                  <h4>京站</h4>
                  <p>台北市大安區復興路999段99號1巷</p>
                </li>
              </ul>

            </div>
            <BtnWithDescription
              content="選擇常用門市"
              className="font-color-primary"
              img="./img/icon_like.svg"
              />
          </div>
        </div>
      </div>
      <div className="shop-detail">
        <div className="shop-name">
          <p>取貨店名</p>
          <p>{selectedShop.name}</p>
          <div className="shop-save">
            <img src="./img/icon_star.svg" alt="save" />
            儲存至常用門市
          </div>
        </div>
        <div className="shop-address">
          <p>取貨地址</p>
          <p>{selectedShop.address}</p>
        </div>
      </div>
    </section>
  )
}

const BuyerInfo = props => {
  const {  validate, form: {name, phone, address, email}, handleValueChange } = props

  return(
    <section className="buyer-info">
      <h3>填寫訂購人資訊</h3>
      <div className="detail">
         <div class="form-row">
           <label for="name">姓名</label>
           <input
             type="text"
             id="name"
             placeholder="請填寫真實姓名"
             onChange={(e) => handleValueChange('name', e.target.value)}
             value={name.value}
             className={!name.valid && "warning"}

           />
           {!name.valid && <span class="invalid-feedback">{name.error}</span>}
         </div>
         <div class="form-row">
           <label for="phone">手機</label>
           <select>
             <option>886</option>
             <option>86</option>
             <option>81</option>
           </select>
           <input
             type="tel"
             id="phone"
             onChange={(e) => handleValueChange('phone', e.target.value)}
             value={phone.value}

             className={!phone.valid && "warning"}
           />
           {!phone.valid && <span class="invalid-feedback">{phone.error}</span>}
         </div>
         <div class="form-row">
           <label for="address">地址</label>
           <input type="text" id="post" placeholder="郵遞區號" />
           <input
             type="text"
             id="address"
             placeholder="例：新北市信義區復興路999段99號1巷8樓"
             onChange={(e) => handleValueChange('address', e.target.value)}
             value={address.value}
             className={!address.valid && "warning"}
           />
           {!address.valid && <span class="invalid-feedback address">{address.error}</span>}
         </div>
         <div class="form-row">
           <label for="email">Email</label>
           <input
             type="email"
             id="email"
             onChange={(e) => handleValueChange('email', e.target.value)}
             value={email.value}
             className={!email.valid && "warning"}
           />
           {!email.valid && <span class="invalid-feedback">{email.error}</span>}
         </div>
      </div>
    </section>
  )
}

class ReceiverInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <section className="receiver-info">
        <h3 className="receiver-title">填寫收件人資訊</h3>
        <input
          id="same"
          type="checkbox"
          for="same"
        />
        <label for="same">
          同訂購人資料
        </label>
        <div className="detail">
           <div class="form-row">
             <label for="name">姓名</label>
             <input type="text" id="name" placeholder="請填寫真實姓名" />
           </div>
           <div class="form-row">
             <label for="phone">手機</label>
             <select>
               <option>886</option>
               <option>86</option>
               <option>81</option>
             </select>
             <input type="tel" id="phone"/>
           </div>
           <div class="form-row">
             <label for="address">地址</label>
             <input type="text" id="post" placeholder="郵遞區號" />
             <input type="text" id="address" placeholder="例：新北市信義區復興路999段99號1巷8樓"/>
           </div>
           <div class="form-row">
             <label for="email">Email</label>
             <input type="email" id="email" />
           </div>
        </div>
      </section>
    )
  }
}

const SuccessMsg = props => {
  return (
    <section className="success-msg">
      <h1>{props.header}</h1>
      <p>{props.content}</p>
      <img src="./img/img_complete.svg" />
    </section>
  )
}

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
              <th scope="col" colspan="2">價格</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>長版無袖洋裝</td>
              <td>1</td>
              <td>綠色</td>
              <td colspan="2">599元</td>
            </tr>
            <tr>
              <td>大球氣質銀飾耳環(針式)</td>
              <td>1</td>
              <td>紅色</td>
              <td colspan="2">281元</td>
            </tr>
            <tr>
              <td colspan="4">運費</td>
              <td>60元</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">共2品項，總計</td>
              <td className="total">NT$ 940</td>
            </tr>
          </tfoot>
        </table>
        <table>
          <caption>取貨資訊</caption>
          <tbody>
            <tr>
              <td>取貨店名</td>
              <td colspan="4">{selectedShop.name}</td>
            </tr>
            <tr>
              <td>取貨地址</td>
              <td colspan="4">{selectedShop.address}</td>
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

const AtmInfo = props => {
  return (
    <section className="atm-info">
      <h3>付款資訊</h3>
      <form className="detail">
         <div class="form-row">
           <label for="bank-list">付款銀行</label>
           <select id="bank-list">
             <option value="" disabled>請選擇銀行</option>
             <option value="004">004 臺灣銀行</option>
             <option value="005">005 臺灣土地</option>
             <option value="006">006 合作金庫</option>
             <option value="007">007 第一銀行</option>
             <option value="008">008 華南銀行</option>
             <option value="009">009 彰化銀行</option>
             <option value="011">011 上海銀行</option>
             <option value="012">012 台北富邦</option>
             <option value="013">013 國泰世華</option>
             <option value="017">017 兆豐銀行</option>
             <option value="021">021 花旗銀行</option>
             <option value="053">053 台中銀行</option>
             <option value="054">054 京城銀行</option>
             <option value="081">081 匯豐銀行</option>
             <option value="102">102 華泰銀行</option>
             <option value="147">147 三信銀行</option>
             <option value="803">803 聯邦銀行</option>
             <option value="806">806 元大銀行</option>
             <option value="807">807 永豐銀行</option>
             <option value="808">808 玉山銀行</option>
             <option value="812">812 台新銀行</option>
             <option value="816">816 安泰銀行</option>
             <option value="822">822 中國信託</option>
           </select>
         </div>
        <ul>
          <li>請先準備好晶片讀卡機與金融卡，以利作業</li>
          <li>請選擇您常用的銀行網路ATM，依步驟將金融卡插進讀卡機後進行轉帳</li>
          <li>使用台新銀行轉帳免費，他行將酌收15元手續費用/筆</li>
        </ul>
      </form>
    </section>
  )
}

const CreditInfo = props => {
  const { form: {creditNum, creditMMYY, creditCVV, creditPhone}, handleValueChange, formatCredit } = props

  return(
    <section className="credit-info">
      <div className="form-title">
        <div>
          <h3>填寫付款資訊</h3>
        </div>
        <div className="cards">
          <img src="./img/card_1.jpg" alt=""/>
          <img src="./img/card_2.png" alt=""/>
          <img src="./img/card_3.png" alt=""/>
        </div>
      </div>

      <div className="detail">
         <div class="form-row">
           <label for="credit-num">信用卡號</label>
           <input
             type="text"
             id="credit-num"
             placeholder="0000 0000 0000 0000"
             onChange={(e) => handleValueChange('creditNum', e.target.value)}
             value={creditNum.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ")}
             className={!creditNum.valid && "warning"}
           />
           {!creditNum.valid && <span class="invalid-feedback">{creditNum.error}</span>}
         </div>
         <div class="form-row">
           <label for="mmyy" className="mmyy-label">有效年月</label>
           <input
             type="text"
             id="mmyy"
             placeholder="MM/YY"
             onChange={(e) => handleValueChange('creditMMYY', e.target.value)}
             value={creditMMYY.value}
             className={!creditMMYY.valid && "warning"}
           />
           <div className="mmyy-notice">
             <div className="inner">
                <p>請翻至卡片背後，為日期標示之數字</p>
                <img src="./img/qa_card_date.svg" alt="" />
             </div>
           </div>
           {!creditMMYY.valid && <span class="invalid-feedback">{creditMMYY.error}</span>}
         </div>
         <div class="form-row">
           <label for="CVV" className="CVV-label">驗證碼</label>
           <input
             type="text"
             id="CVV"
             placeholder="CVV"
             onChange={(e) => handleValueChange('creditCVV', e.target.value)}
             value={creditCVV.value}
             className={!creditCVV.valid && "warning"}
           />
           <div className="CVV-notice">
             <div className="inner">
                <p>請翻至卡片背後，位於簽名欄旁的三碼數字</p>
                <img src="./img/qa_card.svg" alt="" />
             </div>
           </div>
           {!creditCVV.valid && <span class="invalid-feedback">{creditCVV.error}</span>}
         </div>
         <div class="form-row">
           <label for="phone">手機</label>
           <input
             type="tel"
             id="phone"
             placeholder="刷卡若採簡訊驗證，將發至您發卡銀行的手機號碼"
             onChange={(e) => handleValueChange('creditPhone', e.target.value)}
             value={creditPhone.value}
             className={!creditPhone.valid && "warning"}
           />
           {!creditPhone.valid && <span class="invalid-feedback">{creditPhone.error}</span>}
         </div>
      </div>
    </section>
  )
}

const ShopSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>需付金額：940元</td>
          <td>繳費代碼：Rh7847213183</td>
          <td>繳費期限：2019/08/10,am00:00</td>
          <td colspan="2">狀態：待付款</td>
        </tr>
      </tbody>
    </table>
  )
}

const CreditSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>信用卡刷卡：940元</td>
          <td>手續費：0元</td>
          <td colspan="3">狀態：已完成付款</td>
        </tr>
      </tbody>
    </table>
  )
}

const LineSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>LINE Pay付款：940元</td>
          <td>LINE Point折抵：65元</td>
          <td>手續費：0元</td>
          <td colspan="2">狀態：已完成付款</td>
        </tr>
      </tbody>
    </table>
  )
}

const AtmSuccess = props => {
  return (
    <table>
      <caption>付款資訊</caption>
      <tbody>
        <tr>
          <td>Web ATM付款：940元</td>
          <td>付款銀行：玉山銀行</td>
          <td>手續費：15元</td>
          <td colspan="2">狀態：已完成付款</td>
        </tr>
      </tbody>
    </table>
  )
}

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.clearData('selectedPayment')
  }


  render() {
    const {selectedPayment, selectPayment, validate, handleSubmit, routeProps} = this.props

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

class ShopPayment extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    this.props.clearData('form')
  }

  render() {
    const { selectedPayment, form, validate, handleValueChange, routeProps, formatCredit, selectedShop, selectShop, form: {termConfirm}, handleSubmit } = this.props

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
          vlaidate={validate}
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
         <div class="form-row">
             <input
               type="checkbox"
               id="termConfirm"
               onChange={(e) => handleValueChange('termConfirm', e.target.checked)}
             />
             <label for="termConfirm" className="termConfirm">確認，我已暸解</label>
             {!termConfirm.valid && <span class="invalid-feedback">{termConfirm.error}</span>}
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

const OrderSuccess = props => {
  const { selectedShop, prevPath, handleSubmit, routeProps } = props

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

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      selectedPayment: {
        type: '',
        title: '',
        img: ''
      },
      selectedShop: {
        name: '復興',
        address: '台北市大安區復興路999段99號1巷'
      },
      form: {
        name: {
          valid: true,
          value: '',
          error: ''
        },
        phone: {
          valid: true,
          value: '',
          error: ''
        },
        address: {
          valid: true,
          value: '',
          error: ''
        },
        email: {
          valid: true,
          value: '',
          error: ''
        },
        creditNum: {
          valid: true,
          value: '',
          error: ''
        },
        creditMMYY: {
          valid: true,
          value: '',
          error: ''
        },
        creditCVV: {
          valid: true,
          value: '',
          error: ''
        },
        creditPhone: {
          valid: true,
          value: '',
          error: ''
        },
        termConfirm: {
          valid: true,
          value: '',
          error: ''
        }
      }
    }
  }

  getInitialState() {
    return { prevPath: '' }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }

  selectPayment = index => e => {
    if (!e.target.value) return

    const newSelect = {
      type: e.target.value,
      title: paymentType[index].title,
      img: paymentType[index].img
    }

    this.setState({selectedPayment: newSelect})
  }

  validate = type => e => {
    this.setState({form: e.target.value})
  }

  handleValueChange = (field, value, type = 'string') => {
    if (type === 'number') {
      value = +value;
    }

    const { form } = this.state;

    const newFieldObj =  this.validateCheck(field, value);
    if (!newFieldObj) return

    this.setState({
      form: {
        ...form,
        [field]: newFieldObj
      }
    });
  }

  selectShop = e => {
    if (!e.target.closest('li')) return
    let newSelectedShop = {}

    newSelectedShop.name = e.target.closest('li').querySelector('h4').innerHTML
    newSelectedShop.address = e.target.closest('li').querySelector('p').innerHTML

    this.setState({selectedShop: newSelectedShop})
  }

  handleSubmit = (forward, routeProps) => e => {
    e.preventDefault()
    console.log(forward, routeProps)
    const newForm = JSON.parse(JSON.stringify(this.state.form));
    let type = ''
    if (forward.includes('orderSuccess')) {
      type = 'order'
    } else if (forward.includes('checkOut')) {
      type = 'home'
    } else {
      type = 'success'
    }

    switch (type) {
      case 'order': {
        for (let [key, value] of Object.entries(newForm)) {
          newForm[key] = this.validateCheck(key, value.value)
        }
        this.setState({form: newForm})


        if (routeProps.location.pathname.includes('credit')) {
          for (let [key, value] of Object.entries(newForm)) {
            if (!value.valid) return
          }
        } else {
            if (!newForm.name.valid || !newForm.phone.valid || !newForm.email.valid || !newForm.address.valid || !newForm.termConfirm.valid) return
        }
        routeProps.history.replace(forward)
      }
      case 'success': {
        routeProps.history.push(forward)
      }
      case 'home': {
        if (!this.state.selectedPayment.title) return
        routeProps.history.push(forward)
      }
    }


  }

  validateCheck = (field, value) => {
    const newFieldObj = {value, valid: true, error: ''};

    switch (field) {
      case 'name': {
        if (value.length > 5) {
          newFieldObj.error = '姓名最多不超過5個中文字';
          newFieldObj.valid = false;
          return
        } else if (value.length === 0) {
          newFieldObj.error = '請輸入姓名';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'phone': {
        if (!value.match(/^09\d{8}$/)) {
          newFieldObj.error = '手機號碼格式錯誤';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'address': {
        if (!value) {
          newFieldObj.error = '不可為空';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'email': {
        if (!value.match(/^.*@.*\.com$/)) {
          newFieldObj.error = 'Email格式錯誤';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'creditNum': {
        if (!value.match(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)) {
          newFieldObj.error = '信用卡號需為16位數字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'creditMMYY': {
        if (!value.match(/^[0-1][0-9][2][0-9]$/)) {
          newFieldObj.error = '有效年格式為MMYY，請檢查是否有誤';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'creditCVV': {
        if (!value.match(/^\d{3}$/)) {
          newFieldObj.error = 'CVV需為3位數字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'creditPhone': {
        if (!value.match(/^09\d{8}$/)) {
          newFieldObj.error = '手機號碼格式錯誤';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'termConfirm': {
        if (!value) {
          newFieldObj.error = '請確認';
          newFieldObj.valid = false;
        } else {
          newFieldObj.valid = true;
        }
        break
      }
    }
    return newFieldObj
  }

  clearData = type => {

    switch (type) {
      case 'form': {
        console.log('form')
        this.setState({
          form: {
            name: {
              valid: true,
              value: '',
              error: ''
            },
            phone: {
              valid: true,
              value: '',
              error: ''
            },
            address: {
              valid: true,
              value: '',
              error: ''
            },
            email: {
              valid: true,
              value: '',
              error: ''
            },
            creditNum: {
              valid: true,
              value: '',
              error: ''
            },
            creditMMYY: {
              valid: true,
              value: '',
              error: ''
            },
            creditCVV: {
              valid: true,
              value: '',
              error: ''
            },
            creditPhone: {
              valid: true,
              value: '',
              error: ''
            },
            termConfirm: {
              valid: true,
              value: '',
              error: ''
            }
          }
        })
      }
      case 'selectedPayment': {
         this.setState({selectedPayment: ''})
      }
      default: {
        console.log('clear data error')
      }
    }
  }


  render() {
    const {selectedPayment, selectedShop, form, prevPath } = this.state
    const {form: {name, age, gender}} = this.state;

    return (
      <div className="app">
        <TopBar />
        <Route
          path="/"
          render={(props) => (
            <ProgressBar
              routerProps={props}
            />
          )}
        />
        <Switch>
          <Route
            exact path="/"
            render={props => (
              <Home
                selectedPayment={selectedPayment}
                selectPayment={this.selectPayment}
                validate={this.validate}
                handleSubmit={this.handleSubmit}
                routeProps={props}
                clearData={this.clearData}
              />
            )}
          >
          </Route>
          <Route
            path={`/checkOut/${selectedPayment.type}`}
            render={props => (
              <ShopPayment
                selectedPayment={selectedPayment}
                form={form}
                validate={this.validate}
                handleValueChange={this.handleValueChange}
                routeProps={props}
                formatCredit={this.formatCredit}
                selectedShop={selectedShop}
                selectShop={this.selectShop}
                handleSubmit={this.handleSubmit}
                routeProps={props}
                clearData={this.clearData}
              />
            )}
          >
          </Route>
          <Route
            path="/orderSuccess"
            render={props => (
              <OrderSuccess
                selectedShop={selectedShop}
                prevPath={prevPath}
                handleSubmit={this.handleSubmit}
                routeProps={props}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}


export default App;

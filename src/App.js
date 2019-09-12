import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import ProgressBar from './component/ProgressBar'
import TopBar from './component/TopBar'
import Home from './container/Home'
import ShopPayment from './container/ShopPayment'
import OrderSuccess from './container/OrderSuccess'
import { paymentType } from './constant'
import './stylesheet.scss'

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

  componentDidUpdate(nextProps) {
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
        // eslint-disable-next-line
        for (let [key, value] of Object.entries(newForm)) {
          newForm[key] = this.validateCheck(key, value.value)
        }
        this.setState({form: newForm})


        if (routeProps.location.pathname.includes('credit')) {
          // eslint-disable-next-line
          for (let [, value] of Object.entries(newForm)) {
            if (!value.valid) return
          }
        } else {
            if (!newForm.name.valid || !newForm.phone.valid || !newForm.email.valid || !newForm.address.valid || !newForm.termConfirm.valid) return
        }
        routeProps.history.replace(forward)
        break
      }
      case 'success': {
        routeProps.history.push(forward)
        break
      }
      case 'home': {
        if (!this.state.selectedPayment.title) return
        routeProps.history.push(forward)
        break
      }
      default: {
        console.log('error')
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
      default: {
        console.log('error')
      }
    }
    return newFieldObj
  }

  clearData = type => {

    switch (type) {
      case 'form': {
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
        break
      }
      case 'selectedPayment': {
         this.setState({selectedPayment: ''})
         break
      }
      default: {
        console.log('clear data error')
      }
    }
  }


  render() {
    const {selectedPayment, selectedShop, form, prevPath } = this.state

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

import React from 'react'

const ReceiverInfo = () => {
  return(
    <section className="receiver-info">
      <h3 className="receiver-title">填寫收件人資訊</h3>
      <input
        id="same"
        type="checkbox"
        htmlFor="same"
      />
      <label htmlFor="same">
        同訂購人資料
      </label>
      <div className="detail">
          <div className="form-row">
            <label htmlFor="name">姓名</label>
            <input type="text" id="name" placeholder="請填寫真實姓名" />
          </div>
          <div className="form-row">
            <label htmlFor="phone">手機</label>
            <select>
              <option>886</option>
              <option>86</option>
              <option>81</option>
            </select>
            <input type="tel" id="phone"/>
          </div>
          <div className="form-row">
            <label htmlFor="address">地址</label>
            <input type="text" id="post" placeholder="郵遞區號" />
            <input type="text" id="address" placeholder="例：新北市信義區復興路999段99號1巷8樓"/>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
      </div>
    </section>
  )
}

export default ReceiverInfo

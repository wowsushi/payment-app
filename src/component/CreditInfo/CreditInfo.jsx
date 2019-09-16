import React from 'react'

const CreditInfo = props => {
  const { form: {creditNum, creditMMYY, creditCVV, creditPhone}, handleValueChange } = props

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
         <div className="form-row">
           <label htmlFor="credit-num">信用卡號</label>
           <input
             type="text"
             id="credit-num"
             placeholder="0000 0000 0000 0000"
             onChange={(e) => handleValueChange('creditNum', e.target.value)}
             value={creditNum.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ")}
             className={!creditNum.valid? "warning" : undefined}
           />
           {!creditNum.valid && <span className="invalid-feedback">{creditNum.error}</span>}
         </div>
         <div className="form-row">
           <label htmlFor="mmyy" className="mmyy-label">有效年月</label>
           <input
             type="text"
             id="mmyy"
             placeholder="MM/YY"
             onChange={(e) => handleValueChange('creditMMYY', e.target.value)}
             value={creditMMYY.value}
             className={!creditMMYY.valid? "warning" : undefined}
           />
           <div className="mmyy-notice">
             <div className="inner">
                <p>請翻至卡片背後，為日期標示之數字</p>
                <img src="./img/qa_card_date.svg" alt="" />
             </div>
           </div>
           {!creditMMYY.valid && <span className="invalid-feedback">{creditMMYY.error}</span>}
         </div>
         <div className="form-row">
           <label htmlFor="CVV" className="CVV-label">驗證碼</label>
           <input
             type="text"
             id="CVV"
             placeholder="CVV"
             onChange={(e) => handleValueChange('creditCVV', e.target.value)}
             value={creditCVV.value}
             className={!creditCVV.valid? "warning" : undefined}
           />
           <div className="CVV-notice">
             <div className="inner">
                <p>請翻至卡片背後，位於簽名欄旁的三碼數字</p>
                <img src="./img/qa_card.svg" alt="" />
             </div>
           </div>
           {!creditCVV.valid && <span className="invalid-feedback">{creditCVV.error}</span>}
         </div>
         <div className="form-row">
           <label htmlFor="phone">手機</label>
           <input
             type="tel"
             id="phone"
             placeholder="刷卡若採簡訊驗證，將發至您發卡銀行的手機號碼"
             onChange={(e) => handleValueChange('creditPhone', e.target.value)}
             value={creditPhone.value}
             className={!creditPhone.valid? "warning" : undefined}
           />
           {!creditPhone.valid && <span className="invalid-feedback">{creditPhone.error}</span>}
         </div>
      </div>
    </section>
  )
}

export default CreditInfo

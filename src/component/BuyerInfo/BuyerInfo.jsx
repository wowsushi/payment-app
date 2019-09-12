import React from 'react'

const BuyerInfo = props => {
  const { form: {name, phone, address, email}, handleValueChange } = props

  return(
    <section className="buyer-info">
      <h3>填寫訂購人資訊</h3>
      <div className="detail">
         <div className="form-row">
           <label htmlFor="name">姓名</label>
           <input
             type="text"
             id="name"
             placeholder="請填寫真實姓名"
             onChange={(e) => handleValueChange('name', e.target.value)}
             value={name.value}
             className={name.valid? undefined : "warning"}
           />
           {!name.valid && <span className="invalid-feedback">{name.error}</span>}
         </div>
         <div className="form-row">
           <label htmlFor="phone">手機</label>
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
             className={phone.valid? undefined : "warning" }
           />
           {!phone.valid && <span className="invalid-feedback">{phone.error}</span>}
         </div>
         <div className="form-row">
           <label htmlFor="address">地址</label>
           <input type="text" id="post" placeholder="郵遞區號" />
           <input
             type="text"
             id="address"
             placeholder="例：新北市信義區復興路999段99號1巷8樓"
             onChange={(e) => handleValueChange('address', e.target.value)}
             value={address.value}
             className={address.valid? undefined : "warning"}
           />
           {!address.valid && <span className="invalid-feedback address">{address.error}</span>}
         </div>
         <div className="form-row">
           <label htmlFor="email">Email</label>
           <input
             type="email"
             id="email"
             onChange={(e) => handleValueChange('email', e.target.value)}
             value={email.value}
             className={email.valid? undefined : "warning" }
           />
           {!email.valid && <span className="invalid-feedback">{email.error}</span>}
         </div>
      </div>
    </section>
  )
}

export default BuyerInfo

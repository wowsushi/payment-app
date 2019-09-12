export const remarks = [
  '請確認您填寫的資料是否正確，一旦訂單完成後，付款與物流方式皆無法修改。',
  '使用ATM轉帳，將依據銀行入帳日，依序進行出貨/排貨。',
  '每筆訂單所提供的「ATM專屬虛擬帳號」皆不同，若您欲使用本項服務，敬請放心進行匯款作業，安全又便利！',
  '若訂單內含預購、無庫存商品調貨時間請參考「商品平均調貨時間」。',
  '若您對取貨或付款的方式有疑問，請詳閱「購買說明」。',
  '請確認您已詳閱並瞭解本站「購買說明」內容，訂單完成即表示您已同意其中的各項說明。'
]

export const paymentType = [{
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
    img: './img/unionpay.png'
  }, {
    type: 'atm',
    title: 'Web ATM 付款',
    content: '網路銀行ATM操作說明',
    img: './img/icon_atm.svg'
  }
]

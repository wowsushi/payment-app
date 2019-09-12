import React from 'react'

const SuccessMsg = props => {
  return (
    <section className="success-msg">
      <h1>{props.header}</h1>
      <p>{props.content}</p>
      <img src="./img/img_complete.svg" alt=""/>
    </section>
  )
}

export default SuccessMsg

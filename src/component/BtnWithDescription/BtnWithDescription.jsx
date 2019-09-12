import React from 'react'

const BtnWithDescription = props => {
  return (
    <button
      className={`btn-des ${props.className}`}
    >
      <img src={props.img} alt=""/>
      <p>{props.content}</p>
    </button>
  )
}

export default BtnWithDescription

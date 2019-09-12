import React from 'react'

const RemarksPanel = props => {
  const { remarks } = props
  let remarkList = []

  remarks.map((remark, index) => {
    const targetPos = remark.indexOf('「購買說明」')

    if (targetPos > 1) {
      remarkList.push(
        <li key={index}>{remark.slice(0, targetPos) }{<a href="/">「購買說明」</a>}{remark.slice(targetPos + 6, remark.length)}</li>
      )
    } else {
      remarkList.push(
        <li key={index}>{remark}</li>
      )
    }
    return null
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

export default RemarksPanel

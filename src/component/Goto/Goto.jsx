import React from 'react'
import { Link } from 'react-router-dom'

const Goto = props => {
  const { forward, forwardContent, backward, backwardContent, handleSubmit, routeProps} = props

  return (
    <section className="goto">
      <Link to={backward}><button className="btn" >{backwardContent || '上一步'}</button></Link>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit(forward, routeProps)}
      >
        {forwardContent || '下一步'}
      </button>
    </section>
  )
}

export default Goto

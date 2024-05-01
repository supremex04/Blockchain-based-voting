import React from 'react'

const Connected = (props) => {
  return (
    <div className='connected-container'>
        <h1 className="connected_header">You are connected to Metamask!</h1>
        <p className="connected-account">Account: {props.account}</p>
      
    </div>
  )
}

export default Connected;

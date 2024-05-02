import React from 'react'

const Login = (props) => {
  return (
    <div className = "login-container">
      <h1 className = 'welcome-message'> Welcome to voting DApp</h1>
      <button class="button type--A" onClick={props.connectWallet}>
        <div class="button__line"></div>
        <div class="button__line"></div>
        <span class="button__text">LOGIN</span>
        <div class="button__drow1"></div>
        <div class="button__drow2"></div>
      </button>

    </div>
  )
}

export default Login;

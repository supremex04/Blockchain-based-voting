import React from 'react'

const Connected = (props) => {
  return (
    <div className='connected-container'>
        <h1 className="connected_header">You are connected to Metamask!</h1>
        <p className="connected-account">Account: {props.account}</p>
        <p className="connected-account">Time Remaining: {props.remainingTime}</p>
      <div>
      <input type="number" placeholder="Entern Candidate Index" value={props.number} onChange={props.handleNumberChange}></input>
      <button className="login-button" onClick = {props.voteFunction}> Vote</button>
      </div>
      <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
    </div>
  )
}

export default Connected;

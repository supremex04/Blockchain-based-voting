import './App.css';
import { useState, useEffect } from 'react';
import {contractAddress, contractABI} from "./components/constants"
import Login from "./components/Login"
import Connected from "./components/Connected"

const ethers= require("ethers")




function App() {

  const [provider, setProvider] =  useState(null);
  const [account, setAccount] =  useState(null);
  const [isConnected, setConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);

  useEffect( () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setConnected(false);
      setAccount(null);
    }
  }
  async function connectToMetamask(){
    // checking if metamask or other wallet is installed or connected
    if (window.ethereum){
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);

        setProvider(provider);
        //await provider.send("eth_requestAccounts", []);
        
        // await needed else promise is not fulfilled and 
        // we get error on signer.getAddress
        //bundle.js:49 TypeError: signer.getAddress is not a function
        //at connectToMetamask
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);  
        console.log("Metamask connected to: ", address);
        setConnected(true);
      }
      catch(err){
        console.error(err);
      }
    }
    else{
      console.error("Metamask is not detected!");
    }
  }
  async function getCurrentStatus() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractABI, signer
    );
    const status = await contractInstance.getVotingStatus();
    console.log(status);
    setVotingStatus(status);
}

  return (
    <div className="App">
      {isConnected ? (<Connected account = {account}/>) : (<Login connectWallet = {connectToMetamask}/>)}
    </div>
  );
}

export default App;

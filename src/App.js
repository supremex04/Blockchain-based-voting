import './App.css';
import { useState, useEffect } from 'react';
import {contractAddress, contractABI} from "./components/constants"
import Login from "./components/Login"
import Connected from "./components/Connected"

const ethers= require("ethers");




function App() {

  const [provider, setProvider] =  useState(null);
  const [account, setAccount] =  useState(null);
  const [isConnected, setConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);

  useEffect( () => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  }, []);
  

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setConnected(false);
      setAccount(null);
    }
  }
  async function connectToMetamask(){
    // checking if metamask or other wallet is installed or connected
    if (window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);

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
        canVote();
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractABI, signer
    );
    const status = await contractInstance.getVotingTimeStatus();
    console.log(status);
    setVotingStatus(status);
  }
  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractABI, signer
    );
    const time = await contractInstance.getRemainingTime();
    setremainingTime(parseInt(time, 16));
  }
  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractABI, signer
    );
    const candidatesList = await contractInstance.getCandidatesInfo();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    setCandidates(formattedCandidates);
  }
  async function handleNumberChange(e){
    setNumber(e.target.value);
  }

  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractABI, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);

  }

  async function vote(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractABI, signer
    );

    const tx = await contractInstance.vote(number);
    await tx.wait();
    getCandidates();
    canVote();
  }
 
  return (
    <div className="App">
      {isConnected ? (<Connected account = {account}
                                candidates = {candidates}
                                remainingTime = {remainingTime}
                                number= {number}
                                
                                handleNumberChange = {handleNumberChange}
                                voteFunction = {vote}
                                showButton = {CanVote}
                                />) 
      : (<Login connectWallet = {connectToMetamask}/>)}
    </div>
  );
}

export default App;

import './App.css';
import { useState, useEffect } from 'react';
import {contractAddress, contractABI} from "./components/constants"
import Login from "./components/Login"
function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;

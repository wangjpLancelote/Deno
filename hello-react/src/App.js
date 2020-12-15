import React from 'react';
import logo from './logo.svg';
import './App.css';

import CommentApp from './comment/CommentApp'
import ClockIndex from './clock/ClockIndex.jsx';
import Index from './Context/Index'
import LotteryApp from './lottery/LotteryApp';
import HarmonicaApp from './harmonica/HarmonicaApp'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>Hello react</h2>
        {/* <CommentInput/>
        <CommentList/> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <CommentApp/> */}
      <LotteryApp/>
      <HarmonicaApp/>
      <Index/>
      <ClockIndex/>
    </div>
  );
}

export default App;

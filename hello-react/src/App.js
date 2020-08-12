import React from 'react';
import logo from './logo.svg';
import './App.css';

import CommentApp from './comment/CommentApp'
import ClockIndex from './clock/ClockIndex.jsx';
import Index from './Context/Index'

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
      <Index/>
      <ClockIndex/>
    </div>
  );
}

export default App;

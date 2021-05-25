import React from 'react';
import logo from './logo.svg';
import X from './xs/x1'
import Y from './ys/x1'
import Z from './zs/x1'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div><X /></div>
          <div><Y /></div>
          <div><Z /></div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

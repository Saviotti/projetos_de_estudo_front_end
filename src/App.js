import React from 'react';
import ContextProvider from './context';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}

export default App;

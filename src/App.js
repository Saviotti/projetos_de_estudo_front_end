import React from 'react';
import Routes from './Routes';
import ContextProvider from './context/ContextProvider';
import Header from './components/Header';

function App() {
  return (
    <ContextProvider>
      <Header />
      <Routes />
    </ContextProvider>
  );
}

export default App;

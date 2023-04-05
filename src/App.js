import React from 'react';
import ContextProvider from './context';
import Routes from './Routes';
import Recipes from './pages/Recipes';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <Recipes />
      {/* <Routes /> */}
    </ContextProvider>
  );
}

export default App;

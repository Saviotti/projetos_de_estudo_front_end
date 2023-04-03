import React from 'react';
import ContextProvider from './context';
import Login from './pages/Login';

function App() {
  return (
    <ContextProvider>
      <Login />
    </ContextProvider>
  );
}

export default App;

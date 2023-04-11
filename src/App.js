import React from 'react';
import Routes from './Routes';
import ContextProvider from './context/ContextProvider';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <ContextProvider>
      <Header />
      <Routes />
      <Footer />
    </ContextProvider>
  );
}

export default App;

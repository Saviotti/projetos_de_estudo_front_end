import React from 'react';
import Routes from './Routes';
import Footer from './components/Footer';
import Header from './components/Header';
import MenuProvider from './context/MenuProvider';

function App() {
  return (
    <MenuProvider>
      <Header />
      <Routes />
      <Footer />
    </MenuProvider>
  );
}

export default App;

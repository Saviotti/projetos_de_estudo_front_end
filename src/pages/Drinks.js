import React from 'react';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <>
      <h1>Página de drinks</h1>
      <Footer showOn={ ['/meals', '/drinks', '/profile'] } />
    </>
  );
}

import React from 'react';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <div>
      <h1>Página de drinks</h1>
      <Footer showOn={ ['/meals', '/drinks', '/profile'] } />
    </div>
  );
}

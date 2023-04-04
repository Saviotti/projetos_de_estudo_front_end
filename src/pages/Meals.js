import React from 'react';
import Footer from '../components/Footer';

export default function Meals() {
  return (
    <div>
      <h1>Página de Refeições</h1>
      <Footer showOn={ ['/meals', '/drinks', '/profile'] } />
    </div>
  );
}

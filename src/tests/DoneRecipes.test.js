import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';



describe('Testes do componente DoneRecipes', () => {
    it('Verifica se os botões estão sendo renderizados na tela', () => {
      renderWithRouter(<App />);
  
      const  = screen.getByTestId();
      const  = screen.getByTestId();
  
      expect().toBeInTheDocument();
      expect().toBeInTheDocument();
    });

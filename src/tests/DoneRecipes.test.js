import React from 'react';
import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do componente DoneRecipes', () => {
  it('Verifica se os botões estão sendo renderizados na tela', () => {
    renderWithRouter(<DoneRecipes />);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
});

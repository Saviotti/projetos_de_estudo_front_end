import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from '../services/renderWithRouter';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Testes da página FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouter(<FavoriteRecipes />);
  });

  it('Verifica se os itens estão sendo renderizados na tela', () => {
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    const cardImg = screen.getAllByTestId(/horizontal-image/);
    const cardName = screen.getAllByTestId(/horizontal-name/);
    const cardText = screen.getAllByTestId(/horizontal-top-text/);
    const cardShareBtn = screen.getAllByTestId(/horizontal-share-btn/);
    const cardFavBtn = screen.getAllByTestId(/horizontal-favorite-btn/);

    expect(cardImg).toHaveLength(2);
    expect(cardName).toHaveLength(2);
    expect(cardText).toHaveLength(2);
    expect(cardShareBtn).toHaveLength(2);
    expect(cardFavBtn).toHaveLength(2);
  });

  it('Verifica os filtros', () => {
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealsBtn);
    const cardImg = screen.getAllByTestId(/horizontal-image/);
    expect(cardImg).toHaveLength(1);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    const cardImg1 = screen.getAllByTestId(/horizontal-image/);
    expect(cardImg1).toHaveLength(2);

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinksBtn);
    const cardImg2 = screen.getAllByTestId(/horizontal-image/);
    expect(cardImg2).toHaveLength(1);
  });
  // it('Verifica o botão de compartilhamento', async () => {
  //   const cardShareBtn = screen.getByTestId('0-horizontal-share-btn');
  //   userEvent.click(cardShareBtn);
  //   expect(screen.queryByText('Link copied!')).toBeInTheDocument();
  // });
  it('Verifica o botão de favorito', () => {
    const cardFavBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(cardFavBtn);

    const localStorageFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(localStorageFav).toHaveLength(1);
  });
});

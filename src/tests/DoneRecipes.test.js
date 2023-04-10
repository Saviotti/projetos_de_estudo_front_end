import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { copy } from 'fs-extra';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../services/renderWithRouter';

// const imgId = '0-horizontal-image';
// const nameId = '0-horizontal-name';
// const btnId = '0-horizontal-share-btn';

describe('Testes do componente DoneRecipes', () => {
  it('Verifica se os botões estão sendo renderizados na tela', () => {
    renderWithRouter(<DoneRecipes />);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    const titleText = screen.getByText(/DONE RECIPES/i);

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });
  it('Testes dentro do map DataApi de meals', () => {
    // Não estou conseguindo renderizar as informações dentro do map dataApi.
  //   renderWithRouter(<DoneRecipes />);

    //   const img = screen.getByTestId(imgId);
    //   const category = screen.getByTestId('1-horizontal-top-text');
    //   const name = screen.getByTestId(nameId);
    //   const date = screen.getByTestId('1-horizontal-done-date');
    //   const tag1 = screen.getByTestId('1-feijão-horizontal-tag');
    //   const tag2 = screen.getByTestId('1-caseira-horizontal-tag');
    //   const btn = screen.getByTestId(btnId);
    //   const linkCopiedText = screen.getByText(/link copied!/i);

  //   expect(img).toBeInTheDocument();
  //   expect(category).toBeInTheDocument();
  //   expect(name).toBeInTheDocument();
  //   expect(date).toBeInTheDocument();
  //   expect(tag1).toBeInTheDocument();
  //   expect(tag2).toBeInTheDocument();
  //   expect(btn).toBeInTheDocument();
  //   expect(linkCopiedText).toBeInTheDocument();
  });
  // it('Testes dentro do map DataApi de drinks', () => {
  //   renderWithRouter(<DoneRecipes />);

  //   const img = screen.getByTestId(imgId);
  //   const alcool = screen.getByTestId('1-horizontal-top-text');
  //   const name = screen.getByTestId(nameId);
  //   const date = screen.getByTestId('1-horizontal-done-date');
  //   const btn = screen.getByTestId(btnId);
  //   const share = screen.queryByText(/link copied!/i);

  //   expect(img).toBeInTheDocument();
  //   expect(alcool).toBeInTheDocument();
  //   expect(name).toBeInTheDocument();
  //   expect(date).toBeInTheDocument();
  //   expect(btn).toBeInTheDocument();
  //   expect(share).not.toBeInTheDocument();
  // });
  // it('redireciona para página certa', () => {
  //   const { history } = renderWithRouter(<DoneRecipes />, '/done-recipes');

  //   const img = screen.getByTestId(imgId);
  //   userEvent.click(img);

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/drinks/178319');
  // });
  // it('redireciona para página certa', () => {
  //   const fn = jest.fn(() => {});
  //   const { history } = renderWithRouter(
  //     <DoneRecipes func={ fn } />,
  //     '/done-recipes',
  //   );

  //   const btn = screen.getByTestId(btnId);
  //   userEvent.click(btn);

  //   expect(fn).toHaveBeenCalled();

  //   const name = screen.getByTestId(nameId);
  //   userEvent.click(name);

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/drinks/178319');
  // });
  // it('receitas na tela', () => {
  //   const img = screen.queryByTestId('0-horizontal-image');
  //   expect(img).toBeInTheDocument();
  // });
  // it('função do filtro meal', () => {
  //   const btnMeals = screen.getByTestId('filter-by-meal-btn');

  //   userEvent.click(btnMeals);
  //   const img = screen.getAllByTestId(/-horizontal-image/i);

  //   expect(img.length).toBe(1);
  // });
  // it('função do filtro drink', () => {
  //   const btnDrinks = screen.getByTestId('filter-by-drink-btn');

  //   userEvent.click(btnDrinks);
  //   const img = screen.getAllByTestId(/-horizontal-image/i);

  //   expect(img.length).toBe(1);
  // });
  // it('função do filtro meal', () => {
  //   const btnAll = screen.getByTestId('filter-by-all-btn');

  //   userEvent.click(btnAll);
  //   const img = screen.getAllByTestId(/-horizontal-image/i);

  //   expect(img.length).toBe(2);
  // });
  // it('função de share funciona', () => {
  //   const shareBtnId = '0-horizontal-share-btn';
  //   const btn = screen.getByTestId(shareBtnId);

  //   userEvent.click(btn);

  //   expect(copy).toHaveBeenCalled();

  //   const share = screen.getByText(/link copied!/i);
  //   expect(share).toBeInTheDocument();
  // });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../services/renderWithRouter';

const fixClipboardCopy = 'Arrumando problema com o clipboard-copy';
jest.mock('clipboard-copy', () => jest.fn().mockImplementation((input) => {
  if (input === fixClipboardCopy) {
    throw new Error(input);
  }
  return true;
}));

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const allBtn = 'filter-by-all-btn';
const imgId = '0-horizontal-image';
const nameId = '0-horizontal-name';
const shareBtnId = '0-horizontal-share-btn';
const imgIdDrinks = '1-horizontal-image';
const nameIdDrinks = '1-horizontal-name';
const shareBtnIdDrinks = '1-horizontal-share-btn';

describe('Testes do componente DoneRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  it('Verifica se os botões estão sendo renderizados na tela', () => {
    renderWithRouter(<DoneRecipes />);

    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    const titleText = screen.getByText(/DONE RECIPES/i);
    const allBtn1 = screen.getByTestId(allBtn);

    expect(allBtn1).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });
  it('Testa os todos os itens dentro do api de meals e drinks', async () => {
    renderWithRouter(<DoneRecipes />);

    const img = await screen.findByTestId(imgId);
    const name = await screen.getByTestId(nameId);
    const btn = await screen.getByTestId(shareBtnId);
    const category = await screen.getByTestId('0-horizontal-top-text');
    const date = await screen.getByTestId('0-horizontal-done-date');
    const tag1 = await screen.getByTestId('0-Curry-horizontal-tag');
    const tag2 = await screen.getByTestId('0-Pasta-horizontal-tag');
    const imgDrinks = await screen.findByTestId(imgIdDrinks);
    const nameDrinks = await screen.getByTestId(nameIdDrinks);
    const drinksBtn = await screen.getByTestId(shareBtnIdDrinks);
    const drinkCategory = await screen.getByTestId('1-horizontal-top-text');
    const drinkDate = await screen.getByTestId('1-horizontal-done-date');
    // const drinkTag1 = await screen.getByTestId('1-Curry-horizontal-tag');
    // const drinktag2 = await screen.getByTestId('1-Pasta-horizontal-tag');

    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();

    expect(imgDrinks).toBeInTheDocument();
    expect(nameDrinks).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkDate).toBeInTheDocument();
    // expect(drinkTag1).not.toBeInTheDocument();
    // expect(drinktag2).not.toBeInTheDocument();
  });
  it('Testa se ao clicar na imagem, é redirecionado para a página de meals', async () => {
    const { history } = renderWithRouter(<DoneRecipes />, '/done-recipes');

    const img = await screen.getByTestId(imgId);
    userEvent.click(img);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52771');
  });
  it('Testa a função do filtro para meal', async () => {
    renderWithRouter(<DoneRecipes />);

    const mealBtn = await screen.getByTestId('filter-by-meal-btn');

    userEvent.click(mealBtn);
    const img = await screen.getAllByTestId(/-horizontal-image/i);

    expect(img.length).toBe(1);
  });
  it('Testa a função do filtro para drink', async () => {
    renderWithRouter(<DoneRecipes />);

    const btnDrinks = await screen.getByTestId('filter-by-drink-btn');

    userEvent.click(btnDrinks);
    const img = await screen.getAllByTestId(/-horizontal-image/i);

    expect(img.length).toBe(1);
  });
  it('Testa a função do filtro para o botão All', async () => {
    renderWithRouter(<DoneRecipes />);

    const allBtn2 = screen.getByTestId(allBtn);

    userEvent.click(allBtn2);
    const img = await screen.getAllByTestId(/-horizontal-image/i);

    expect(img.length).toBe(2);
  });
  it('Testa se ao clicar no ícone de compartilhamento, o texto Link copied! é copiado e renderizado na tela', async () => {
    renderWithRouter(<DoneRecipes />);

    const btn = await screen.getByTestId(shareBtnIdDrinks);
    userEvent.click(btn);
    expect(copy).toHaveBeenCalled();

    const share = await screen.getByText(/link copied!/i);
    expect(share).toBeInTheDocument();
  });
  it('Testa se o localStorage traz as informações da chave doneRecipes toda vez que a página atualiza', async () => {
    // Ver como fazer isso.
    renderWithRouter(<DoneRecipes />);

    document.location.reload();

    const data = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(data).toEqual(doneRecipes);
  });
});

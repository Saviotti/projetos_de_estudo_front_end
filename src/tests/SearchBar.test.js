import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { waterSearch, currySearch, aSearch } from './mocks';

const emailTest = 'trybe@test.com';
const passwordTest = '1234567';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH = 'exec-search-btn';
const INGREDIENT_SEARCH = 'ingredient-search-radio';
const FIRSTLETTER_SEARCH = 'first-letter-search-radio';

describe('Testes do componente SearchBar do Header', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(waterSearch),
    }));

    await act(async () => renderWithRouter(<App />));

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Enter/i });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(button);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
  });

  afterEach(() => jest.clearAllMocks());

  it('Verifica se todos os elementos são renderizados', () => {
    const searchBar = screen.getByTestId(SEARCH_INPUT);
    expect(searchBar).toBeInTheDocument();

    const ingredientsBt = screen.getByTestId(INGREDIENT_SEARCH);
    expect(ingredientsBt).toBeInTheDocument();
    const nameBt = screen.getByTestId('name-search-radio');
    expect(nameBt).toBeInTheDocument();
    const firstLetterBt = screen.getByTestId(FIRSTLETTER_SEARCH);
    expect(firstLetterBt).toBeInTheDocument();
    const searchBt = screen.getByTestId(EXEC_SEARCH);
    expect(searchBt).toBeInTheDocument();
  });

  it('Verifica se ao buscar uma receita por ingrediente é feita a requisição para a API e as receitas são renderizadas (water)', async () => {
    const searchBar = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchBar, 'water');
    const ingredientsBt = screen.getByTestId(INGREDIENT_SEARCH);
    userEvent.click(ingredientsBt);

    const searchBt = screen.getByTestId(EXEC_SEARCH);
    userEvent.click(searchBt);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=water');

    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards).toHaveLength(12);
  });

  it('Verifica se é gerado um alerta caso nenhuma receita seja encontrada ()', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(currySearch) });
    window.alert = jest.fn();
    const searchBar = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchBar, 'curry');
    const ingredientsBt = screen.getByTestId(INGREDIENT_SEARCH);
    userEvent.click(ingredientsBt);

    const searchBt = screen.getByTestId(EXEC_SEARCH);
    userEvent.click(searchBt);

    await waitFor(
      () => expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'),
      { timeout: 1000 },
    );
  });

  it('Verifica se é gerado um alerta caso mais de 1 letra seja procurada na opção de busca por primeira letra', async () => {
    window.alert = jest.fn();
    const searchBar = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchBar, 'sushi');
    const nameBt = screen.getByTestId(FIRSTLETTER_SEARCH);
    userEvent.click(nameBt);
    const searchBt = screen.getByTestId(EXEC_SEARCH);
    userEvent.click(searchBt);

    await waitFor(
      () => expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'),
      { timeout: 1000 },
    );
  });
});

describe('teste mocks api', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(aSearch) });

    await act(async () => renderWithRouter(<App />));

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Enter/i });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(button);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
  });

  afterEach(() => jest.clearAllMocks());

  it('Verifica se ao buscar uma receita pela primeira letra é feita a requisição para a API e as receitas são renderizadas (a)', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(aSearch) });

    const searchBar = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchBar, 'a');
    const firstLetterBt = screen.getByTestId(FIRSTLETTER_SEARCH);
    userEvent.click(firstLetterBt);

    const searchBt = screen.getByTestId(EXEC_SEARCH);
    userEvent.click(searchBt);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');

    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards).toHaveLength(4);
  });

  it('Verifica se é redirecionado para a página da receita caso apenas 1 seja retornada pela API (Sushi)', async () => {
    const sushiSearch = {
      meals: [{
        idMeal: '53065',
        strMeal: 'Sushi',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      }],
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(sushiSearch) });

    const searchBar = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchBar, 'sushi');
    const nameBt = screen.getByTestId('name-search-radio');
    userEvent.click(nameBt);
    const searchBt = screen.getByTestId(EXEC_SEARCH);
    userEvent.click(searchBt);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=sushi');
    expect(screen.getByTestId('page-title', { name: 'Meals/53065' })).toBeInTheDocument();
  });
});

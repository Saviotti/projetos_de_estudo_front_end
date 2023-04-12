import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import ContextProvider from '../context/MenuProvider';
import Recipes from '../pages/Recipes';

const mockContext = {
  data: 'Test Data',
  fetchData: jest.fn(() => Promise.resolve()),
};
const history = createMemoryHistory();

describe('Testes do componente Recipes', () => {
  beforeEach(() => {
    render(
      <MemoryRouter history={ history }>
        <ContextProvider value={ mockContext }>
          <Recipes />
        </ContextProvider>
      </MemoryRouter>,
    );
  });

  it('Verifica se é renderizada uma lista de receitas', async () => {
    expect(await waitFor(() => screen.getByTestId('0-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('1-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('2-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('3-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('4-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('5-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('6-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('7-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('8-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('9-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('10-recipe-card'))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByTestId('11-recipe-card'))).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-recipe-card'));
  });

  it('Verifica se os botões de categorias são renderizados', async () => {
    const categoryFilter = await screen.findByTestId(/category-filter/i);
    expect(categoryFilter).toBeVisible();
  }, 2000);

  it('Verifica se exibe as categorias de comidas corretamente', async () => {
    waitFor(async () => {
      const allCategories = await screen.findByTestId('All-category-filter');
      expect(allCategories).toBeInTheDocument();
      userEvent.click(allCategories);

      expect(await waitFor(() => screen.findByText(/corba/i))).toBeInTheDocument();
      const beef = await screen.findByTestId('Beef-category-filter');
      expect(beef).toBeInTheDocument();
      userEvent.click(beef);
      expect(await waitFor(() => screen.findByText(/beef and mustard/i))).toBeInTheDocument();

      const breakFast = await screen.findByTestId('Breakfast-category-filter');
      expect(breakFast).toBeInTheDocument();
      userEvent.click(breakFast);
      expect(await waitFor(() => screen.findByText(/breakfast potatoes/i))).toBeInTheDocument();

      const chicken = await screen.findByTestId('Chicken-category-filter');
      expect(chicken).toBeInTheDocument();
      userEvent.click(chicken);
      expect(await waitFor(() => screen.findByText(/ayam percik/i))).toBeInTheDocument();

      const dessert = await screen.findByTestId('Dessert-category-filter');
      expect(dessert).toBeInTheDocument();
      userEvent.click(dessert);
      expect(await waitFor(() => screen.findByText(/apam balik/i))).toBeInTheDocument();

      const goat = await screen.findByTestId('Goat-category-filter');
      expect(goat).toBeInTheDocument();
      userEvent.click(goat);
      expect(await waitFor(() => screen.findByText(/mbuzi choma/i))).toBeInTheDocument();

      expect(allCategories).toBeInTheDocument();
      userEvent.click(allCategories);
      expect(await waitFor(() => screen.findByText(/corba/i))).toBeInTheDocument();
      expect(await waitFor(() => screen.findByText(/beef and mustard/i))).not.toBeInTheDocument();
    }, { timeout: 5000 });
  }, 10000);

  it('Verifica se exibe as categorias de drinks corretamente', async () => {
    history.push('/drinks');
    waitFor(async () => {
      const allCategories = await screen.findByTestId('All-category-filter');
      expect(allCategories).toBeInTheDocument();
      userEvent.click(allCategories);

      expect(await waitFor(() => screen.findByText(/gg/i))).toBeInTheDocument();
      const ordinary = await screen.findByTestId('Ordinary Drink-category-filter');
      expect(ordinary).toBeInTheDocument();
      userEvent.click(ordinary);
      expect(await waitFor(() => screen.findByText(/mile long island/i))).toBeInTheDocument();

      const cocktail = await screen.findByTestId('Cocktail-category-filter');
      expect(cocktail).toBeInTheDocument();
      userEvent.click(cocktail);
      expect(await waitFor(() => screen.findByText(/belmont/i))).toBeInTheDocument();

      const shake = await screen.findByTestId('Shake-category-filter');
      expect(shake).toBeInTheDocument();
      userEvent.click(shake);
      expect(await waitFor(() => screen.findByText(/florida bushwackerk/i))).toBeInTheDocument();

      const other = await screen.findByTestId('Other / Unknown-category-filter');
      expect(other).toBeInTheDocument();
      userEvent.click(other);
      expect(await waitFor(() => screen.findByText(/absolut evergreen/i))).toBeInTheDocument();

      const cocoa = await screen.findByTestId('Cocoa-category-filter');
      expect(cocoa).toBeInTheDocument();
      userEvent.click(cocoa);
      expect(await waitFor(() => screen.findByText(/castillian hot chocolate/i))).toBeInTheDocument();

      userEvent.click(allCategories);
      expect(await waitFor(() => screen.findByText(/gg/i))).toBeInTheDocument();

      expect(await waitFor(() => screen.findByText(/mile long island/i))).not.toBeInTheDocument();
    }, { timeout: 5000 });
  }, 10000);

  it('Verifica se a rota é alterada', async () => {
    await waitFor(() => {
      const receita1 = screen.getByTestId('0-card-name');
      expect(receita1).toBeInTheDocument();
      userEvent.click(receita1);
    }, { timeout: 50000 });
  });
});

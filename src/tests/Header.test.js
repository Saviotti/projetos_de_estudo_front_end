import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const emailTest = 'trybe@test.com';
const passwordTest = '1234567';

describe('Testes do componente Header', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Enter/i });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(button);
  });

  it('Verifica se os elemento cabeçalho são renderizados', () => {
    const title = screen.getByText('Meals', { level: 1 });
    expect(title).toBeInTheDocument();

    const searchBt = screen.getByTestId('search-top-btn');
    expect(searchBt).toBeInTheDocument();

    const profileLnk = screen.getByTestId('profile-top-btn');
    expect(profileLnk).toBeInTheDocument();
  });
  it('Verifica se ao clicar no link do profile a pagina é redirecionada', async () => {
    const history = createMemoryHistory();
    const profileLnk = screen.getByTestId('profile-top-btn');

    act(() => {
      userEvent.click(profileLnk);
    });

    await waitFor(
      () => expect(history.location.pathname).toBe('/profile'),
      { timeout: 3000 },
    );
  });

  it('Verifica se ao clicar no botao de busca, o searchBar é renderizado', async () => {
    const searchBt = screen.getByTestId('search-top-btn');
    userEvent.click(searchBt);

    const searchInp = screen.getByTestId('search-input');
    expect(searchInp).toBeVisible();

    userEvent.click(searchBt);
    expect(searchInp).not.toBeInTheDocument();
  });
});

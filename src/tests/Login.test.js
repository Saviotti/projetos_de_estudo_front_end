import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const inputEmailTestId = 'email-input';
const inputPasswordTestId = 'password-input';
const emailTest = 'trybe@test.com';
const passwordTest = '1234567';

describe('Testes do componente Login', () => {
  it('Verifica se os inputs para digitar email e senha foram renderizados', () => {
    render(<App />);

    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputPassword = screen.getByTestId(inputPasswordTestId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  it('Testa se o botão no componente Login é renderizado e se está desabilitado', () => {
    render(<App />);

    const button = screen.getByRole('button', {
      name: /Enter/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it('Testa se o botão no componente Login está habilitado', () => {
    render(<App />);

    const button = screen.getByRole('button', {
      name: /Enter/i,
    });
    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputPassword = screen.getByTestId(inputPasswordTestId);

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, passwordTest);
    expect(button).not.toBeDisabled();
  });
  it('Testa se ao clicar no botão enter é redirecionado para a rota /meals', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /Enter/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});

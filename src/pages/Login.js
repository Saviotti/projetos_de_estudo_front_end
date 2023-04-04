import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateLogin } from '../utils/validateLogin';

const INITIAL_STATE = { email: '', password: '' };

export default function Login() {
  const [state, setState] = useState(INITIAL_STATE);
  const { email, password } = state;

  const handleInputChange = useCallback(({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  }, []);

  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form>
      <h1 className="h1">LOGIN</h1>
      <div className="login">
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            id="email-input"
            type="email"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Password"
            value={ password }
            onChange={ handleInputChange }
            id="password-input"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          id="login-submit-btn"
          name="login-submit-btn"
          disabled={ validateLogin(email, password) }
          onClick={ handleClick }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

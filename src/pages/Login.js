import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateLogin } from '../utils/validateLogin';
import chefHatIcon from '../images/chefHatIcon.svg';

const INITIAL_STATE = { email: '', password: '' };

export default function Login() {
  const [state, setState] = useState(INITIAL_STATE);
  const { email, password } = state;

  const handleInputChange = ({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-back">
      <form className="login" onSubmit={ handleSubmit }>
        {/* <h1 className="h1">LOGIN</h1> */}
        <img src={ chefHatIcon } alt="logo" width={ 80 } />
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
        >
          Enter
        </button>
      </form>
    </div>
  );
}

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/ContextProvider';
import { validateLogin } from '../utils/validateLogin';

const INITIAL_STATE = {
  email: '',
  btDisabled: true,
  password: '',
};

export default function Login() {
  const [state, setState] = useState(INITIAL_STATE);
  const { setEmail } = useContext(Context);

  const handleInputChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState, [target.name]: target.value, btDisabled: validateLogin(prevState),
    }));
  };

  const history = useHistory();

  const handleClick = () => {
    const { email } = state;
    localStorage.setItem('user', JSON.stringify({ email }));
    setEmail(email);
    history.push('/meals');
  };

  return (
    <div>
      <h1 className="h1">LOGIN</h1>
      <div className="login">
        <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Email"
          value={ state.email }
          onChange={ handleInputChange }
          id="email-input"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Password"
          value={ state.password }
          onChange={ handleInputChange }
          id="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          name="login-submit-btn"
          id="login-submit-btn"
          disabled={ state.btDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

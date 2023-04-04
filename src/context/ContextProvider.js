import PropTypes from 'prop-types';
import { useState, createContext, useMemo } from 'react';

export const Context = createContext();

function ContextProvider({ children }) {
  const [button, setButton] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const contextValue = useMemo(() => ({
    button,
    setButton,
    password,
    setPassword,
    email,
    setEmail,
  }), [button, password, email]);

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;

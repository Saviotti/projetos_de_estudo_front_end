import PropTypes from 'prop-types';
import { useState, createContext, useMemo } from 'react';

export const Context = createContext();

function ContextProvider({ children }) {
  const [button, setButton] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState('meal');

  const contextValue = useMemo(() => ({
    button,
    setButton,
    password,
    setPassword,
    email,
    setEmail,
    menu,
    setMenu,
    page,
    setPage,
  }), [button, password, email, menu, page]);

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

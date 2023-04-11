import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

export const MenuContext = createContext();

export default function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);

  const contextValue = useMemo(() => ({
    menu,
    setMenu,
  }), [menu]);

  return (
    <MenuContext.Provider value={ contextValue }>
      { children }
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import { useState, useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import fetchAPI from '../utils/fetchAPI';
import { Context } from '../context/index';

function SearchBar() {
  const INITIAL_STATE = {
    searchFor: '',
    searchBy: 'ingredient',
  };

  const [state, setState] = useState(INITIAL_STATE);
  const { setMenu } = useContext(Context);
  const location = useLocation();

  const handleInputChange = useCallback(({ target }) => {
    setState((prevState) => ({
      ...prevState, [target.name]: target.value,
    }));
  }, []);

  const verifyStr = async (path, key) => {
    if (state.searchFor.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    setMenu(await fetchAPI(`https://www.${path}.com/api/json/v1/1/search.php?f=${state.searchFor}`, key));
  };

  const handleClick = useCallback(async () => {
    const path = location.pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const key = location.pathname.slice(1);
    switch (state.searchBy) {
    case 'ingredient':
      setMenu(await fetchAPI(`https://www.${path}.com/api/json/v1/1/filter.php?i=${state.searchFor}`, key));
      break;
    case 'name':
      setMenu(await fetchAPI(`https://www.${path}.com/api/json/v1/1/search.php?s=${state.searchFor}`, key));
      break;
    case 'first-letter':
      verifyStr(path, key);
      break;
    default:
      break;
    }
    setState({ ...state, searchFor: '' });
  });

  return (
    <div className="searchBar">
      <input
        data-testid="search-input"
        value={ state.searchFor }
        placeholder="Search"
        type="text"
        onChange={ handleInputChange }
        name="searchFor"
      />
      <div>
        <label htmlFor="ingredient">
          Ingredients
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="searchBy"
            value="ingredient"
            id="ingredient"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            name="searchBy"
            value="name"
            id="name"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="first-letter">
          First letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="searchBy"
            value="first-letter"
            id="first-letter"
            onChange={ handleInputChange }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>

  );
}

export default SearchBar;

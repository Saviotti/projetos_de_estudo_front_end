import { useState, useCallback, useContext } from 'react';
import { Context } from '../context';

function SearchBar() {
  const INITIAL_STATE = {
    searchFor: '',
    searchBy: 'ingredient',
  };

  const [state, setState] = useState(INITIAL_STATE);

  const { context, setContext } = useContext(Context);

  const handleInputChange = useCallback(({ target }) => {
    setState((prevState) => ({
      ...prevState, [target.name]: target.value,
    }));
  }, []);

  const handleClick = useCallback(() => {
    fetchAPI(state);
    // Meal:
    //     `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}`
    //    `https://www.themealdb.com/api/json/v1/1/search.php?s={nome}`
    //    ` https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}`
    // Drinks:
    // `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`
    // `www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`
    // `www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeira-letra}`
    // global.alert

    setContext((prevState) => ({ ...prevState, searchFor, searchBy }));
    setState(INITIAL_STATE);
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
        ESEA
      </button>
    </div>

  );
}

export default SearchBar;

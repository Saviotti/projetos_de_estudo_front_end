import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMenu } from '../context/MenuProvider';
import {
  filterByFirstLetterUrl,
  filterByIngredientUrl,
  filterByNameUrl,
} from '../utils/endpoints';
import { fetchApi } from '../utils/fetchAPI';

const INITIAL_STATE = {
  searchInput: '',
  searchRadio: '',
};

export default function SearchBar() {
  const { menu, setMenu } = useMenu();
  const [state, setState] = useState(INITIAL_STATE);
  const { searchInput, searchRadio } = state;
  const { pathname } = useLocation();

  const history = useHistory();

  useEffect(() => {
    switch (menu.length) {
    case 0:
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      break;
    case 1: {
      const { idMeal, idDrink } = menu[0];
      history.push(`/${idMeal ? 'meals' : 'drinks'}/${idDrink || idMeal}`);
      break;
    }
    default:
      break;
    }
  }, [menu, history]);

  const handleInputChange = useCallback(({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchInput || !searchRadio) return;

    const recipesType = pathname.includes('/meals') ? 'meal' : 'cocktail';
    switch (searchRadio) {
    case 'ingredient':
      fetchApi(setMenu, filterByIngredientUrl(recipesType, searchInput));
      break;
    case 'name':
      fetchApi(setMenu, filterByNameUrl(recipesType, searchInput));
      break;
    case 'firstLetter':
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      fetchApi(setMenu, filterByFirstLetterUrl(recipesType, searchInput));
      break;
    default:
      break;
    }
  };

  return (
    <form onSubmit={ handleSubmit } className="searchBar">
      <input
        data-testid="search-input"
        placeholder="Search"
        type="text"
        value={ searchInput }
        onChange={ handleInputChange }
        name="searchInput"
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          type="radio"
          name="searchRadio"
          value="ingredient"
          onChange={ handleInputChange }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          data-testid="name-search-radio"
          id="name-search-radio"
          type="radio"
          name="searchRadio"
          value="name"
          onChange={ handleInputChange }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          type="radio"
          name="searchRadio"
          value="firstLetter"
          onChange={ handleInputChange }
        />
      </label>
      <button type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

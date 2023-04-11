import { useCallback, useState } from 'react';

const INITIAL_STATE = {
  searchInput: '',
  searchRadio: 'ingredient',
};

export default function SearchBar() {
  // const { menu, setMenu } = useMenu();
  const [state, setState] = useState(INITIAL_STATE);
  const { searchInput } = state;
  // const location = useLocation();
  // const history = useHistory();

  // useEffect(() => {
  //   const key = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  //   switch (menu.length) {
  //   case 0:
  //     global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //     break;
  //   case 1:
  //     history.push(`/${page}/${menu[0][key]}`);
  //     break;
  //   default:
  //     break;
  //   }
  // }, [menu]);

  const handleInputChange = useCallback(({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  }, []);

  // const verifyStr = async (path, key) => {
  //   if (state.searchFor.length !== 1) {
  //     return global.alert('Your search must have only 1 (one) character');
  //   }
  //   setMenu(await fetchAPI(`https://www.${path}.com/api/json/v1/1/search.php?f=${state.searchFor}`, key) || []);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('handleClick', state.searchBy, state.searchFor);
    // const path = location.pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    // const key = location.pathname.slice(1);
    // switch (state.searchBy) {
    // case 'ingredient':
    //   setMenu(await fetchAPI(`https://www.${path}.com/api/json/v1/1/filter.php?i=${state.searchFor}`, key) || []);
    //   break;
    // case 'name':
    //   setMenu(await fetchAPI(`https://www.${path}.com/api/json/v1/1/search.php?s=${state.searchFor}`, key) || []);
    //   break;
    // case 'first-letter':
    //   verifyStr(path, key);
    //   break;
    // default:
    //   break;
    // }
    // setState({ ...state, searchFor: '' });
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
        Ingredients
        <input
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          type="radio"
          name="searchRadio"
          checked
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

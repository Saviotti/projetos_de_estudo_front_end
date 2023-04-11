import { useCallback, useState } from 'react';

const INITIAL_STATE = {
  searchFor: '',
  searchBy: 'ingredient',
};

export default function SearchBar() {
  const [state, setState] = useState(INITIAL_STATE);
  // const { menu, setMenu, page } = useContext(Context);
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

  const handleClick = () => {
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

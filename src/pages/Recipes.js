import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [component, setComponent] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  const history = useHistory();

  const fetchMeals = async () => {
    const doze = 12;
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const response = await api.json();
    const { meals } = response;
    const util = meals.slice(0, doze);
    setRecipes(util);
    setComponent(true);
  };
  const categorieButtonMeal = async () => {
    const cinco = 5;
    const categoriesApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const response = await categoriesApi.json();
    const { meals } = response;
    const util = meals.slice(0, cinco);
    setCategories(util);
  };

  const fetchDrinks = async () => {
    const api = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const response = await api.json();
    const { drinks } = response;
    const doze = 12;
    const util = drinks.slice(0, doze);
    setRecipes(util);
    setComponent(false);
  };
  const categorieButtonDrink = async () => {
    const cinco = 5;
    const categoriesApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const response = await categoriesApi.json();
    const { drinks } = response;
    const util = drinks.slice(0, cinco);
    setCategories(util);
  };

  useEffect(() => {
    if (history.location.pathname === '/meals') {
      fetchMeals();
      categorieButtonMeal();
    } else {
      fetchDrinks();
      categorieButtonDrink();
    }
  }, [history.location.pathname]);

  const removeAllFilters = () => {
    if (history.location.pathname === '/meals') {
      fetchMeals();
      categorieButtonMeal();
    } else {
      fetchDrinks();
      categorieButtonDrink();
    }
  };

  const handleClick = async (e) => {
    if (activeFilter.some((element) => element === e)) {
      removeAllFilters();
      setActiveFilter([]);
    } else if (history.location.pathname === '/meals') {
      const doze = 12;
      const searchCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`);
      const response = await searchCategory.json();
      const { meals } = response;
      const util = meals.slice(0, doze);
      setRecipes(util);
      setActiveFilter([...activeFilter, e]);
    } else {
      const doze = 12;
      const searchCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`);
      const response = await searchCategory.json();
      const { drinks } = response;
      const util = drinks.slice(0, doze);
      setRecipes(util);
      setActiveFilter([...activeFilter, e]);
    }
  };

  const componentsMeals = (
    <div>
      <label htmlFor="buttons">
        {
          categories.map((element, index) => (
            <button
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              name="buttons"
              type="button"
              onClick={ () => handleClick(element.strCategory) }
            >
              { element.strCategory }
            </button>
          ))
        }
        {' '}
        <button
          data-testid="All-category-filter"
          type="button"
          name="buttons"
          onClick={ removeAllFilters }
        >
          All
        </button>
      </label>
      {
        recipes.map((recipe, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              { recipe.strMeal }
            </h2>
            <p>
              { recipe.strInstructions }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              alt={ recipe.strMeal }
              src={ recipe.strMealThumb }
            />
          </span>
        ))
      }
    </div>
  );

  const componentsDrinks = (
    <div>
      <label htmlFor="buttons">
        {
          categories.map((element, index) => (
            <button
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              name="buttons"
              type="button"
              onClick={ () => handleClick(element.strCategory) }
            >
              { element.strCategory }
            </button>
          ))
        }
        {' '}
        <button
          data-testid="All-category-filter"
          type="button"
          name="buttons"
          onClick={ removeAllFilters }
        >
          All
        </button>
      </label>
      {
        recipes.map((recipe, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              { recipe.strDrink }
            </h2>
            <img
              data-testid={ `${index}-card-img` }
              alt={ recipe.strDrink }
              src={ recipe.strDrinkThumb }
            />
          </span>
        ))
      }
    </div>
  );

  return (
    <>
      { component ? componentsMeals : componentsDrinks }
      <Footer />
    </>
  );
}

export default Recipes;

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  mealsAPI,
  buttonsMeals,
  drinksAPI,
  mealsCategories,
  drinksCategories,
  buttonsDrinks,
} from '../services/recipesAPI';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [component, setComponent] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  const history = useHistory();

  const fetchMeals = async () => {
    const meals = await mealsAPI();
    setRecipes(meals);
    setComponent(true);
  };
  const categorieButtonMeal = async () => {
    const setButtons = await buttonsMeals();
    setCategories(setButtons);
  };

  const fetchDrinks = async () => {
    const drinks = await drinksAPI();
    setRecipes(drinks);
    setComponent(false);
  };
  const categorieButtonDrink = async () => {
    const setButtons = await buttonsDrinks();
    setCategories(setButtons);
  };

  useEffect(() => {
    if (history.location.pathname === '/meals') {
      fetchMeals();
      categorieButtonMeal();
    } else {
      fetchDrinks();
      categorieButtonDrink();
    }
  }, [history]);

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
    const equalFilter = activeFilter.some((element) => element === e);
    if (equalFilter) {
      removeAllFilters();
      setActiveFilter([]);
    } else if (history.location.pathname === '/meals') {
      const setMealsCategori = await mealsCategories(e);
      setRecipes(setMealsCategori);
      setActiveFilter([...activeFilter, e]);
    } else {
      const setDrinksCategories = await drinksCategories(e);
      setRecipes(setDrinksCategories);
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

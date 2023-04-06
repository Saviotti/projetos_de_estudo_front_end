import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/ContextProvider';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import {
  mealsAPI,
  buttonsMeals,
  drinksAPI,
  mealsCategories,
  drinksCategories,
  buttonsDrinks,
} from '../services/recipesAPI';

export default function Recipes() {
  const { menu, setMenu, setPage } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [component, setComponent] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  const history = useHistory();

  const fetchMeals = async () => {
    const meals = await mealsAPI();
    setMenu(meals);
    setComponent(true);
  };
  const categorieButtonMeal = async () => {
    const setButtons = await buttonsMeals();
    console.log('setbutton');
    setCategories(setButtons);
  };

  const fetchDrinks = async () => {
    const drinks = await drinksAPI();
    setMenu(drinks);
    setComponent(false);
  };

  const categorieButtonDrink = async () => {
    const setButtons = await buttonsDrinks();
    console.log('setbutton');
    setCategories(() => setButtons);
  };

  useEffect(() => {
    if (history.location.pathname === '/meals') {
      fetchMeals();
      setComponent(true);
      categorieButtonMeal();
      setPage('meals');
    } else {
      fetchDrinks();
      setComponent(false);
      categorieButtonDrink();
      setPage('drinks');
    }
  }, [history]);

  const removeAllFilters = () => {
    if (history.location.pathname === '/meals') {
      fetchMeals();
      setComponent(true);
      categorieButtonMeal();
    } else {
      fetchDrinks();
      setComponent(false);
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
      setMenu(setMealsCategori);
      setActiveFilter([...activeFilter, e]);
    } else {
      const setDrinksCategories = await drinksCategories(e);
      setMenu(setDrinksCategories);
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
      <div className="recipes">
        {
          menu.map((recipe, index) => (
            <RecipeCard key={ index } recipe={ recipe } index={ index } />
          ))
        }
      </div>
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
      <div className="recipes">
        {
          menu.map((recipe, index) => (
            <RecipeCard key={ index } recipe={ recipe } index={ index } />
          ))
        }
      </div>
    </div>
  );

  return (
    <>
      <Header />
      { component ? componentsMeals : componentsDrinks }
      <Footer />
    </>
  );
}

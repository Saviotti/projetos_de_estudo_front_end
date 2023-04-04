import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const [component, setComponent] = useState(false);

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
    }
    if (history.location.pathname === '/drinks') {
      fetchDrinks();
      categorieButtonDrink();
    }
  }, [history.location.pathname]);

  const componentsMeals = (
    <div>
      {
        recipes.map((recipe, index) => (
          <div
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
          </div>
        ))
      }
      <label htmlFor="filterButton">
        {
          categories.map((element, index) => (
            <button
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              name="filterButton"
            >
              { element.strCategory }
            </button>
          ))
        }
      </label>
    </div>
  );

  const componentsDrinks = (
    <div>
      {
        recipes.map((recipe, index) => (
          <div
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
          </div>
        ))
      }
      <label htmlFor="filterButton">
        {
          categories.map((element, index) => (
            <button
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              name="filterButton"
            >
              { element.strCategory }
            </button>
          ))
        }
      </label>
    </div>
  );

  return (
    component ? componentsMeals : componentsDrinks
  );
}

export default Recipes;

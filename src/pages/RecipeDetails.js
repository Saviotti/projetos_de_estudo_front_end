import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import RecommendCard from '../components/RecommendCard';
import { fetchApi } from '../utils/fetchAPI';
import { recipesUrl } from '../utils/endpoints';

export default function RecipeDetails({ match }) {
  const { params, url } = match;
  const [details, setDetails] = useState();
  const [recommendation, setRecommendation] = useState();
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();
  const path = url.includes('drinks') ? 'drinks' : 'meals';
  // const inProgressRecipes = {
  //   meals: {
  //     52774: [],
  //   },
  //   drinks: {
  //     178320: [],
  //   },
  // };

  useEffect(() => {
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    console.log(url);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    console.log(doneRecipes);
    const isDone = doneRecipes.some((recipe) => recipe.id === params.id);
    setDone(isDone);
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    console.log(inProgressRecipe);
    if (inProgressRecipe.length > 0) {
      const Progress = Object.keys(inProgressRecipe[path])
        .some((recipe) => recipe === params.id);
      setInProgress(Progress);
    }
  }, []);

  useEffect(() => {
    const numberOfRecipes = 6;
    const fetchDrinkDetails = async () => {
      const drinksEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(drinksEndPoint);
      const data = await response.json();
      const drinkDetails = data.drinks[0];
      setDetails(drinkDetails);
    };
    const fetchMealDetails = async () => {
      const mealsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const response = await fetch(mealsEndPoint);
      const data = await response.json();
      const mealDetails = data.meals[0];
      setDetails(mealDetails);
    };

    if (url === `/drinks/${params.id}`) {
      fetchDrinkDetails();
      fetchApi(setRecommendation, recipesUrl('meal'), numberOfRecipes);
    } else {
      fetchMealDetails();
      fetchApi(setRecommendation, recipesUrl('cocktail'), numberOfRecipes);
    }
  }, [params.id, url]);

  return (
    <section className="recipeDetailss">
      { details ? <RecipeDetailsCard details={ details } /> : <span>loading...</span> }
      <fieldset>
        <legend>Recommended</legend>
        <div className="carousel">
          {recommendation && recommendation
            .map((recipe, i) => (
              <RecommendCard key={ i } recipe={ recipe } index={ i } />
            ))}
        </div>
      </fieldset>
      <button
        className="startRecipe"
        data-testid="start-recipe-btn"
        disabled={ done }
        onClick={ () => { history.push(`/${path}/${params.id}/in-progress`); } }
      >
        { inProgress ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

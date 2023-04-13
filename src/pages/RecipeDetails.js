import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import RecipeDetailsCard from '../components/FavRecipeCard';
import RecommendCard from '../components/RecommendCard';
import { fetchApi } from '../utils/fetchAPI';
import { recipesUrl } from '../utils/endpoints';

export default function RecipeDetails({ match }) {
  const { params, url } = match;
  const [details, setDetails] = useState();
  const [recommendation, setRecommendation] = useState();

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
  console.log(details);

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
      >
        Start Recipe
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

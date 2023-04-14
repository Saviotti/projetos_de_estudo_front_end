import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchApi } from '../utils/fetchAPI';

export const recipeInProgress = (recipesType, id) => `https://www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${id}`;

export default function RecipeInProgress() {
  const [data, setData] = useState([]);
  const [ingredientCheckbox, setIngredientCheckbox] = useState({});
  const { pathname } = useLocation();

  const recipeType = pathname.includes('meals') ? 'meal' : 'cocktail';
  const id = pathname.split('/')[2];

  useEffect(() => {
    fetchApi(setData, recipeInProgress(recipeType, id));
  }, [recipeType, id]);

  const dataConstant = data.length > 0 ? data[0] : [];

  const filterIngredients = () => {
    const recipeDetailsKeys = Object.keys(dataConstant);
    const ingredientsKeys = recipeDetailsKeys
      .filter((key) => (
        key.includes('strIngredient')
            && dataConstant[key] !== null
            && dataConstant[key] !== ''));
    const ingredients = ingredientsKeys
      .map((key) => `${dataConstant[key]}`);
    return ingredients;
  };

  const wilson = filterIngredients();

  const handleChangeCheckbox = ({ target }) => {
    setIngredientCheckbox((prevState) => (
      { ...prevState, [target.name]: target.checked }));
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="image-title-buttons-container">
          <section className="image-title-section">
            <img
              data-testid="recipe-photo"
              alt="name"
              width="140px"
              src={ data[0].strMealThumb || data[0].strDrinkThumb }
            />
            <h1
              data-testid="recipe-title"
            >
              { data[0].strMeal || data[0].strDrink }
            </h1>
            <button>
              <img
                data-testid="share-btn"
                alt="share-btn"
                src={ shareIcon }
              />
            </button>
            <button>
              <img
                data-testid="favorite-btn"
                alt="favorite-btn"
                src={ whiteHeartIcon }
              />
            </button>
            <p
              data-testid="recipe-category"
            >
              { data[0].strCategory }
            </p>
          </section>
          <section>
            <h2>
              Ingredients
            </h2>
            <label htmlFor="ingredients-container">
              {wilson.map((ingredient, index) => (
                <label htmlFor={ `${index}-ingredient-step` } key={ index }>
                  <input
                    data-testid={ `${index}-ingredient-step` }
                    type="checkbox"
                    id={ `${index}-ingredient-step` }
                    name={ `${ingredient}` }
                    onChange={ handleChangeCheckbox }
                    checked={ ingredientCheckbox[ingredient] }
                  />
                  {ingredient}
                </label>
              ))}
              ;
            </label>
          </section>
          <section className="instructions-section">
            <div className="instructions-container">
              <h2>
                Instructions
              </h2>
              <p
                data-testid="instructions"
              >
                { data[0].strInstructions }
              </p>
            </div>
          </section>
          <section className="finish-btn">
            <div>
              <button
                data-testid="finish-recipe-btn"
                alt="finish-btn"
              >
                FINISH RECIPE
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

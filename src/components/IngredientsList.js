import PropTypes from 'prop-types';

function IngredientsList({ details }) {
  const filterIngredients = () => {
    const filterIngredientsKeys = () => {
      const recipeDetailsKeys = Object.keys(details);
      const ingredientsKeys = recipeDetailsKeys
        .filter((key) => (
          key.includes('strIngredient')
          && details[key] !== null
          && details[key] !== ''));
      const measureKeys = recipeDetailsKeys
        .filter((key) => key.includes('strMeasure'));
      const result = [ingredientsKeys, measureKeys];
      return result;
    };

    const ingredientsDetails = filterIngredientsKeys();
    const [ingredientsKeys, measureKeys] = ingredientsDetails;
    const ingredients = ingredientsKeys
      .map((key, index) => ` ${details[measureKeys[index]]} ${details[key]}`);
    return ingredients;
  };

  return (
    <div className="ingredientsList">
      <fieldset>
        <legend>Ingredients</legend>
        <ul>
          { details && filterIngredients()
            .map((ingredient, i) => (
              <li
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                {ingredient}
              </li>))}
        </ul>
      </fieldset>
    </div>
  );
}

IngredientsList.propTypes = {
  details: PropTypes.shape({}).isRequired,
};

export default IngredientsList;

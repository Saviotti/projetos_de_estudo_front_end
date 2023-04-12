import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index }) {
  const { strDrink, strDrinkThumb, idDrink, strMeal, strMealThumb, idMeal } = recipe;

  return (
    <Link
      to={ `/${idMeal ? 'meals' : 'drinks'}/${idDrink || idMeal}` }
      className="recipeCard"
      data-testid={ `${index}-recipe-card` }
    >
      <h3 data-testid={ `${index}-card-name` }>{ strDrink || strMeal }</h3>
      <img
        data-testid={ `${index}-card-img` }
        alt={ strDrink || strMeal }
        src={ strDrinkThumb || strMealThumb }
      />
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/ContextProvider';

export default function RecipeCard(props) {
  const { recipe, index } = props;
  const { strDrink, strDrinkThumb, idDrink } = recipe;
  const { strMeal, strMealThumb, idMeal } = recipe;
  const id = idDrink || idMeal;
  const { page } = useContext(Context);
  console.log(recipe);
  console.log(index);

  return (
    <Link to={ `/${page}/${id}` }>
      <div className="recipeCard" data-testid={ `${index}-recipe-card` }>
        <h2
          data-testid={ `${index}-card-name` }
        >
          { strDrink || strMeal }
        </h2>
        <img
          data-testid={ `${index}-card-img` }
          alt={ strDrink || strMeal }
          src={ strDrinkThumb || strMealThumb }
        />
      </div>
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

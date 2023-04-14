import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeImage from './RecipeImage';
import IngredientsList from './IngredientsList';
import FavShareButtons from './FavShareButtons';
import back from '../images/back.svg';

function RecipeDetailsCard({ details }) {
  const { history } = useHistory();
  const recipe = {
    alcoholicOrNot: details.strAlcoholic || '',
    category: details.strCategory || '',
    id: details.idDrink || details.idMeal,
    image: details.strDrinkThumb || details.strMealThumb,
    name: details.strDrink || details.strMeal,
    nationality: details.strArea || '',
    type: details.idMeal ? 'meal' : 'drink',
  };

  return (
    <div className="recipeDetails">
      <header className="header">
        <button onClick={ () => console.log(history) }>
          <img width={ 20 } src={ back } alt="voltar" />
        </button>
        <h1
          data-testid="recipe-title"
        >
          { details.strDrink || details.strMeal }
        </h1>
        <FavShareButtons
          shareDataTestid="share-btn"
          recipe={ recipe }
          favDataTestid="favorite-btn"
        />
      </header>
      <RecipeImage data={ details } />
      <fieldset>
        <legend>TAGs</legend>
        <p
          data-testid="recipe-category"
        >
          {details.strAlcoholic || details.strCategory}
        </p>
      </fieldset>
      <IngredientsList details={ details } />
      <fieldset
        data-testid="instructions"
      >
        <legend>Instructions</legend>
        {details.strInstructions}
      </fieldset>
      {details.strYoutube
      && (
        <iframe
          width="350"
          height="300"
          src={ details.strYoutube.replace('watch?v=', 'embed/') }
          title="recipe"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture; web-share"
          data-testid="video"
        />)}
    </div>
  );
}
RecipeDetailsCard.propTypes = {
  details: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
};
export default RecipeDetailsCard;

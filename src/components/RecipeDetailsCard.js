import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeImage from './RecipeImage';
import IngredientsList from './IngredientsList';
import FavShareButtons from './FavShareButtons';
import back from '../images/back.svg';

function RecipeDetailsCard({ details }) {
  const { history } = useHistory();
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
          recipe={ { id: '52771', type: 'meal' } }
          favDataTestid="favorite-btn"
        />
      </header>
      <RecipeImage data={ details } />
      <fieldset>
        <legend>TAGs</legend>
        <h2
          data-testid="recipe-category"
        >
          {details.strAlcoholic || details.strCategory}
        </h2>
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
          // allowfullscreen
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
  }).isRequired,
};
export default RecipeDetailsCard;

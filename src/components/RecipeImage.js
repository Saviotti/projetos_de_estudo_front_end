import PropTypes from 'prop-types';

function RecipeImage({ data }) {
  return (
    <img
      className="cover"
      data-testid="recipe-photo"
      src={ data.strMealThumb || data.strDrinkThumb }
      alt={ data.strMeal || data.strDrink }
      width={ 360 }
    />
  );
}

RecipeImage.propTypes = {
  data: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};
export default RecipeImage;

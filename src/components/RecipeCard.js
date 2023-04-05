import { Link } from 'react-router-dom';

export default function RecipeCard(recipe, index) {
  const { strDrink, strDrinkThumb, idDrink } = recipe;
  const { strMeal, strMealThumb, idMeal } = recipe;
  const id = idDrink || idMeal;

  return (
    <Link to={ `/${id}` }>
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

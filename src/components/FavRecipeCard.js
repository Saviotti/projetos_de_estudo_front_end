import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavRecipeCard(props) {
  const { recipe, index } = props;
  const { type, id, image, nationality, category,
    alcoholicOrNot, name, doneDate } = recipe;
  const [isCopied, setIsCopied] = useState(false);
  console.log(recipe);

  const handleClickShareBtn = (item) => {
    const threeSeconds = 3000;
    clipboardCopy(`http://localhost:3000/${item.type}s/${item.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), threeSeconds);
  };

  return (
    <div className="favRecipeCard">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="recipeImg"
          data-testid={ `${index}-horizontal-image` }
          alt="name"
          src={ image }
        />
      </Link>
      <div className="recipe-data">
        <Link to={ `/${type}s/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>
            {name}
          </h2>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${nationality} - ${category}`}
          {alcoholicOrNot}
        </p>

        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {doneDate}
        </p>
        {isCopied && <p>Link copied!</p>}
        <div>
          <button
            onClick={ () => handleClickShareBtn(recipe) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share-button"
            />
          </button>

          <button
            onClick={ () => handleFavorite(recipe) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ whiteHeartIcon }
              alt="favorite-button"
            />
          </button>
        </div>

      </div>
    </div>

  );
}

FavRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

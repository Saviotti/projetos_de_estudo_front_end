import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavShareButtons({ shareDataTestid, recipe, favDataTestid }) {
  const [isCopied, setIsCopied] = useState(false);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setHeart(data.some((item) => item.id === recipe.id));
  }, []);

  const handleClickShareBtn = () => {
    const oneSeconds = 1000;
    clipboardCopy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), oneSeconds);
  };

  const handleClickFavorite = () => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setHeart(!data.some((item) => item.id === recipe.id));
    let newData = [];
    if (data.some((item) => item.id === recipe.id)) {
      newData = data.filter((item) => item.id !== recipe.id);
    } else {
      newData = [...data, recipe];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };

  return (
    <>
      {isCopied && <p>Link copied!</p>}
      <div className="iconButtons">
        <button
          onClick={ () => handleClickShareBtn() }
        >
          <img
            data-testid={ shareDataTestid }
            src={ shareIcon }
            alt="share-button"
          />
        </button>
        <button
          onClick={ () => handleClickFavorite() }
        >
          <img
            data-testid={ favDataTestid }
            src={ heart ? blackHeartIcon : whiteHeartIcon }
            alt="favorite-button"
          />
        </button>
      </div>
    </>
  );
}

FavShareButtons.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  shareDataTestid: PropTypes.string.isRequired,
  favDataTestid: PropTypes.string.isRequired,
};

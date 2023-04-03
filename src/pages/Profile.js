import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const getUserEmail = localStorage.getItem('user');

  const history = useHistory();

  const handleClickDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleClickFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>
      <h1>
        PROFILE
      </h1>
      <h3
        className="Profile"
        data-testid="profile-email"
        type="text"
        id="profile-email"
      >
        {getUserEmail}
      </h3>
      <div>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ handleClickDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ handleClickFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

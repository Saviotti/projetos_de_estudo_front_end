import React from 'react';

export default function Profile() {
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
        {' email '}
      </h3>
      <div>
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
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

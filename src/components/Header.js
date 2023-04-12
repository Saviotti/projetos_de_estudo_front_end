import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const PAGES_TO_RENDER_HEADER = [
  '/meals',
  '/drinks',
  '/profile',
  '/done-recipes',
  '/favorite-recipes',
];

export default function Header() {
  const { pathname } = useLocation();
  const renderHeader = PAGES_TO_RENDER_HEADER.some((page) => page === pathname);

  const [renderSeachBar, setRenderSeachBar] = useState(false);

  if (!renderHeader) return null;

  const renderSearchButton = ['/meals', '/drinks'].some((page) => page === pathname);

  const strTitle = pathname.replace('/', '').replace('-', ' ');
  const title = strTitle.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const searchButton = (
    <button type="button" onClick={ () => setRenderSeachBar(!renderSeachBar) }>
      <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
    </button>
  );

  return (
    <header className="header">
      <h1 data-testid="page-title">{ title }</h1>
      { renderSeachBar && <SearchBar /> }
      { renderSearchButton && searchButton }
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </Link>
    </header>
  );
}

import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../images/profileIcon.svg';
// import './Header.css';

function Header() {
  const [searchIcon, setSearchIcon] = useState(false);
  const [title, setTitle] = useState('');
  const [searchBar, setSearchBar] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setSearchIcon(['meals', 'drinks'].includes(path));
    const str = path.split('-');
    setTitle(str.map((palavra) => palavra.charAt(0)
      .toUpperCase() + palavra.slice(1)).join(' '));
  }, [location]);

  return (
    <>
      <div className="header">
        <h1 data-testid="page-title">{title}</h1>
        <div>
          <button
            data-testid="profile-top-btn"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              data-testid="profile-top-btn"
              src="profileIcon"
              alt="profile"
            />
          </button>
          { searchIcon
            && (
              <button
                data-testid="search-input"
                type="button"
                onClick={ () => setSearchBar(!searchBar) }
              >
                <img
                  data-testid="search-top-btn"
                  src="searchIcon"
                  alt="search"
                />
              </button>
            )}
        </div>
      </div>
      { searchIcon && searchBar && <SearchBar /> }
    </>
  );
}

export default Header;

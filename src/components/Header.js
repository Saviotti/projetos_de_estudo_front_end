// import { useState, useEffect } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';

// function Header() {
//   const [searchBt, setSearchBt] = useState(false);
//   const [title, setTitle] = useState('');
//   const [searchBar, setSearchBar] = useState(false);

//   const location = useLocation();
//   const history = useHistory();

//   useEffect(() => {
//     const path = location.pathname.replace('/', '');
//     setSearchBt(['meals', 'drinks'].includes(path));
//     const str = path.split('-');
//     setTitle(str.map((palavra) => palavra.charAt(0)
//       .toUpperCase() + palavra.slice(1)).join(' '));
//   }, [location]);

//   return (
//     <>
//       <div className="header">
//         <h1 data-testid="page-title">{title}</h1>
//         <div>
//           { searchBt
//               && (
//                 <button
//                   // data-testid="search-top-btn"
//                   type="button"
//                   onClick={ () => setSearchBar(!searchBar) }
//                 >
//                   <img
//                     data-testid="search-top-btn"
//                     src={ searchIcon }
//                     alt="search"
//                   />
//                 </button>
//               )}
//           <button
//             // data-testid="profile-top-btn"
//             type="button"
//             onClick={ () => history.push('/profile') }
//           >
//             <img
//               data-testid="profile-top-btn"
//               src={ profileIcon }
//               alt="profile"
//             />
//           </button>

//         </div>
//       </div>
//       { searchBt && searchBar && <SearchBar /> }
//     </>
//   );
// }

// export default Header;

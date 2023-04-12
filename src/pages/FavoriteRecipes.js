import { useState, useEffect } from 'react';
import FilterButtons from '../components/FilterButtons';
import FavRecipeCard from '../components/FavRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  return (
    <>
      <Header />
      <FilterButtons localStorageKey="favoriteRecipes" setData={ setData } />
      {
        data.map((recipe, index) => (
          <FavRecipeCard
            key={ index }
            recipe={ recipe }
            index={ index }
            setData={ setData }
          />
        ))
      }
      <Footer />
    </>
  );
}

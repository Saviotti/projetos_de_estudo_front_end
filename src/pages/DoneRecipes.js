import { useState, useEffect } from 'react';
import FilterButtons from '../components/FilterButtons';
import FavRecipeCard from '../components/FavRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.doneRecipes) {
      setData(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  return (
    <>
      <Header />
      <FilterButtons localStorageKey="doneRecipes" setData={ setData } />
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

import { useState, useEffect } from 'react';
import FilterButtons from '../components/FilterButtons';
import FavRecipeCard from '../components/FavRecipeCard';
import Footer from '../components/Footer';

export default function DoneRecipes() {
  const [data, setData] = useState([]);
  // const doneRecipes = [
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ];
  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    if (localStorage.doneRecipes) {
      setData(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  return (
    <>
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

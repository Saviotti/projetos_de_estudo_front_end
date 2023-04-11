import FilterButtons from '../components/FilterButtons';
import FavRecipeCard from '../components/FavRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  return (
    <>
      <Header />
      {/* <FilterButtons /> */}
      {
        favoriteRecipes.map((recipe, index) => (
          <FavRecipeCard key={ index } recipe={ recipe } index={ index } />
        ))
      }
      <Footer />
    </>
  );
}

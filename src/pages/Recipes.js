import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeCard';
import { useMenu } from '../context/MenuProvider';
import { categoriesUrl, filterByCategoryUrl, recipesUrl } from '../utils/endpoints';
import { fetchApi } from '../utils/fetchAPI';

const RECIPES_QUANTITY = 12;
const CATEGORIES_QUANTITY = 5;

export default function Recipes() {
  const { pathname } = useLocation();
  const recipesType = pathname.includes('meal') ? 'meal' : 'cocktail';

  const { menu, setMenu } = useMenu();
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(() => {
    fetchApi(setMenu, recipesUrl(recipesType), RECIPES_QUANTITY);
    fetchApi(setCategories, categoriesUrl(recipesType), CATEGORIES_QUANTITY);
  }, [recipesType, setMenu]);

  const handleCategoryClick = useCallback((category) => {
    const newCategory = category === currentFilter ? '' : category;
    const endpoint = newCategory
      ? filterByCategoryUrl(recipesType, newCategory)
      : recipesUrl(recipesType);

    fetchApi(setMenu, endpoint, RECIPES_QUANTITY);

    setCurrentFilter(newCategory);
  }, [currentFilter, recipesType, setMenu]);

  const recipesList = menu.map((recipe, index) => (
    <li key={ recipe.strMeal || recipe.strDrink }>
      <RecipeCard recipe={ recipe } index={ index } />
    </li>
  ));

  const categoriesList = categories.map(({ strCategory }) => (
    <li key={ strCategory }>
      <Button
        id={ `${strCategory}-category-filter` }
        label={ strCategory }
        onClick={ () => handleCategoryClick(strCategory) }
      />
    </li>
  ));

  return (
    <>
      <ul>
        <li>
          <Button
            id="All-category-filter"
            label="All"
            onClick={ () => handleCategoryClick('') }
          />
        </li>
        { categoriesList.length > 0 && categoriesList }
      </ul>
      <ol>{ menu.length > 0 && recipesList }</ol>
    </>
  );
}

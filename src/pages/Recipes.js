import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeCard';
import {
  recipesCategoriesUrl,
  recipesFilteredByCategoryUrl,
  recipesUrl,
} from '../utils/endpoints';
import { fetchApi } from '../utils/fetchAPI';

const RECIPES_QUANTITY = 12;
const CATEGORIES_QUANTITY = 5;

export default function Recipes() {
  const { pathname } = useLocation();
  const recipesType = pathname.includes('meal') ? 'meal' : 'cocktail';

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(() => {
    fetchApi(setRecipes, recipesUrl(recipesType), RECIPES_QUANTITY);
    fetchApi(setCategories, recipesCategoriesUrl(recipesType), CATEGORIES_QUANTITY);
  }, [recipesType]);

  const handleCategoryClick = useCallback((category) => {
    const newCategory = category === currentFilter ? '' : category;
    const endpoint = newCategory
      ? recipesFilteredByCategoryUrl(recipesType, newCategory)
      : recipesUrl(recipesType);

    fetchApi(setRecipes, endpoint, RECIPES_QUANTITY);

    setCurrentFilter(newCategory);
  }, [currentFilter, recipesType]);

  const recipesList = recipes.map((recipe, index) => (
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
      <ol>{ recipes.length > 0 && recipesList }</ol>
    </>
  );
}

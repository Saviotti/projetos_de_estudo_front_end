export const recipesUrl = (recipesType) => `https://www.the${recipesType}db.com/api/json/v1/1/search.php?s=`;

export const categoriesUrl = (recipesType) => `https://www.the${recipesType}db.com/api/json/v1/1/list.php?c=list`;

export const filterByCategoryUrl = (recipesType, recipesCategory) => `https://www.the${recipesType}db.com/api/json/v1/1/filter.php?c=${recipesCategory}`;

export const filterByIngredientUrl = (recipesType, ingredient) => `https://www.the${recipesType}db.com/api/json/v1/1/filter.php?i=${ingredient}`;

export const filterByNameUrl = (recipesType, name) => `https://www.the${recipesType}db.com/api/json/v1/1/search.php?s=${name}`;

export const filterByFirstLetterUrl = (recipesType, firstLetter) => `https://www.the${recipesType}db.com/api/json/v1/1/search.php?f=${firstLetter}`;

export const recipeDetails = (recipeType, id) => `https://www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${id}`;

export const recipesUrl = (type) => `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;

export const recipesCategoriesUrl = (type) => `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`;

export const recipesFilteredByCategoryUrl = (type, category) => `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`;

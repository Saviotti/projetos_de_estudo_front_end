export const mealsAPI = async () => {
  const doze = 12;
  const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await api.json();
  const { meals } = response;
  const util = meals.slice(0, doze);
  return util;
};

export const categoriesAPI = async () => {
  const cinco = 5;
  const categoriesApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await categoriesApi.json();
  const { meals } = response;
  const util = meals.slice(0, cinco);
  return util;
};

export const drinksAPI = async () => {
  const api = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await api.json();
  const { drinks } = response;
  const doze = 12;
  const util = drinks.slice(0, doze);
  return util;
};

export const mealsCategories = async (e) => {
  const doze = 12;
  const searchCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`);
  const response = await searchCategory.json();
  const { meals } = response;
  const util = meals.slice(0, doze);
  return util;
};

export const drinksCategories = async (e) => {
  const doze = 12;
  const searchCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`);
  const response = await searchCategory.json();
  const { drinks } = response;
  const util = drinks.slice(0, doze);
  return util;
};

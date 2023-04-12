export const RECIPES_QUANTITY = 12;

export async function fetchApi(setFunction, endpoint, quantity = RECIPES_QUANTITY) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    const recipesData = data.meals || data.drinks;
    const recipes = recipesData ? recipesData.slice(0, quantity) : [];
    setFunction(recipes);
  } catch (error) {
    console.error(error);
  }
}

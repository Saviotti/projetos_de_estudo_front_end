export async function fetchApi(setFunction, endpoint, quantity) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    const recipesData = data.meals || data.drinks;
    const recipes = recipesData.slice(0, quantity);
    setFunction(recipes);
  } catch (error) {
    console.error(error);
  }
}

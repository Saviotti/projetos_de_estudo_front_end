export default async function fetchAPI(url, key) {
  const response = await fetch(url);
  const json = await response.json();
  if (json[key] === null) {
    return [];
  }
  const doze = 12;
  console.log(json[key]);
  const util = json[key].slice(0, doze);
  return util;
}

export const buttonsCategories = async (url, key) => {
  const cinco = 5;
  const categoriesApi = await fetch(url);
  const response = await categoriesApi.json();
  const util = response[key].slice(0, cinco);
  return util;
};

export const mealsCategories = async (url, key, e) => {
  const doze = 12;
  const searchCategory = await fetch(`${url}${e}`);
  const response = await searchCategory.json();
  const util = response[key].slice(0, doze);
  return util;
};

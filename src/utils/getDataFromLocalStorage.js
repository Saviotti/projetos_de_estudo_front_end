export const getDataFromLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key)) || []
);

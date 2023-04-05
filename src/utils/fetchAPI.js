export default async function fetchAPI(url, key) {
  const response = await fetch(url);
  const json = await response.json();
  return json[key] || [];
}

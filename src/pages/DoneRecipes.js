import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [dataApi, setDataApi] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (localStorage.doneRecipes) {
      setDataApi(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const handleClickShareBtn = (item) => {
    const threeSeconds = 3000;
    clipboardCopy(`http://localhost:3000/${item.type}s/${item.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), threeSeconds);
  };

  const handleFilter = (type) => {
    const filter = JSON.parse(localStorage.getItem('doneRecipes'));
    setDataApi(filter.filter((e) => e.type === type));
  };

  const handleClickAll = () => {
    setDataApi(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  return (
    <div>
      <h1 className="h1">DONE RECIPES</h1>
      <div className="done-recipes" />
      {isCopied && <p>Link copied!</p>}
      <section>
        <label htmlFor="All-food-drinks">
          <label htmlFor="All">
            <button
              data-testid="filter-by-all-btn"
              type="button"
              onClick={ handleClickAll }
            >
              All
            </button>
          </label>
          <label htmlFor="Meals">
            <button
              data-testid="filter-by-meal-btn"
              type="button"
              onClick={ () => handleFilter('meal') }
            >
              Meals
            </button>
          </label>
          <label htmlFor="Drinks">
            <button
              data-testid="filter-by-drink-btn"
              type="button"
              onClick={ () => handleFilter('drink') }

            >
              Drinks
            </button>
          </label>
        </label>
      </section>
      <section>
        {dataApi.length > 0 && dataApi.map((item, index) => (
          <div key={ index }>
            <Link to={ `/${item.type}s/${item.id}` }>
              <label htmlFor="image-card">
                <img
                  data-testid={ `${index}-horizontal-image` }
                  alt="name"
                  src={ item.image }
                  width="140px"
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${item.nationality} - ${item.category}`}
                  {item.alcoholicOrNot}
                </p>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {item.name}
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {item.doneDate}
                </p>
                {
                  item.tags.map((tag) => (
                    <span
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </span>
                  ))
                }
              </label>
            </Link>
            <button
              onClick={ () => handleClickShareBtn(item) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share-button"
              />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

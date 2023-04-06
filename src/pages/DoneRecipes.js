import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [dataApi, setDataApi] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  // const history = useHistory();

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

  // const getDoneRecipes = setDataApi.JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log(getDoneRecipes);

  return (
    <div>
      <Header />
      <h1 className="h1">DONE RECIPES</h1>
      <div className="done-recipes" />
      {isCopied && <p>Link copied!</p>}
      <section>
        <label htmlFor="All-food-drinks">
          <label htmlFor="All">
            <button
              data-testid="filter-by-all-btn"
              type="button"
            >
              All
            </button>
          </label>
          <label htmlFor="Meals">
            <button
              data-testid="filter-by-meal-btn"
              type="button"
            >
              Food
            </button>
          </label>
          <label htmlFor="Drinks">
            <button
              data-testid="filter-by-drink-btn"
              type="button"
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
      <Footer />
    </div>
  );
}

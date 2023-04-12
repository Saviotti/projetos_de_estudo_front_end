import PropTypes from 'prop-types';

export default function FilterButtons(props) {
  const { localStorageKey, setData } = props;

  const handleClickAll = () => {
    setData(JSON.parse(localStorage.getItem(localStorageKey)));
  };

  const handleFilter = (type) => {
    const filter = JSON.parse(localStorage.getItem(localStorageKey));
    setData(filter.filter((e) => e.type === type));
  };

  return (
    <section className="filterButtons">
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ handleClickAll }
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => handleFilter('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => handleFilter('drink') }
      >
        Drinks
      </button>
    </section>
  );
}

FilterButtons.propTypes = {
  localStorageKey: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};

import PropTypes, { string } from 'prop-types';

export default function FilterButtons(props) {
  const {localStorageKey,} = props;
  const [dataApi, setDataApi] = useState([]);

  const handleClickAll = () => {
    setDataApi(JSON.parse(localStorage.getItem(localStorageKey)));
  };

  const handleFilter = (type) => {
    const filter = JSON.parse(localStorage.getItem(localStorageKey));
    setDataApi(filter.filter((e) => e.type === type));
  };

  return (
    <section>
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

import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img src="/src/images/drinkIcon.svg" alt="drinks" />
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
        <img src="/src/images/mealIcon.svg" alt="meals" />
      </button>
    </footer>
  );
}

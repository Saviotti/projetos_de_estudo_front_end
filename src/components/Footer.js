import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  // const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } data-testid="meals-bottom-btn" alt="meal" />
      </Link>
    </footer>
  );
}

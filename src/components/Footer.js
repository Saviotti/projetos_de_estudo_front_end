import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const PAGES_TO_RENDER_FOOTER = ['/meals', '/drinks', '/profile'];

export default function Footer() {
  const { pathname } = useLocation();
  const renderFooter = PAGES_TO_RENDER_FOOTER.some((page) => page === pathname);

  if (!renderFooter) return null;

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

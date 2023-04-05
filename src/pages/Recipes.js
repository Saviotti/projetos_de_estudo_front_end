import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/index';
import RecipeCard from '../components/RecipeCard';

export default function Recipes() {
  const { menu } = useContext(Context);
  const [state, setState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const key = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
    switch (menu.length) {
    case 0:
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      break;
    case 1:
      history.push(`/${menu[0][key]}`);
      break;
    default:
      setState(true);
    }
  }, [menu]);
  return (
    <>
      <Header />
      <div className="recipes">
        {
          state && (
            menu.map((recipe, index) => (
              <RecipeCard key={ index } { ...recipe } />
            )))
        }
      </div>
      <Footer />
    </>
  );
}

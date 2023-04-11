import { Route, Switch } from 'react-router-dom';
// import Login from './pages/Login';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import Recipes from './pages/Recipes';

function Routes() {
  return (
    <Switch>
      {/* <Route exact path="/" component={ Login } /> */}
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes/:id" component={ DoneRecipes } />
      <Route path="/favorite-recipes/:id" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;

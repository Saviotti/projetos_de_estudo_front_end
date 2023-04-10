import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <ContextProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/drinks/:id" component={ RecipeDetails } /> */}
        <Route path="/drinks" component={ Recipes } />
        {/* <Route path="/meals/:id" component={ RecipeDetails } /> */}
        <Route path="/meals" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </ContextProvider>
  );
}

export default App;

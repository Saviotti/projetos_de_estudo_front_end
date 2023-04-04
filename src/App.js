import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <ContextProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </ContextProvider>
  );
}

export default App;

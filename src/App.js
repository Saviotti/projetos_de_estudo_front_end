import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <ContextProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </ContextProvider>
  );
}

export default App;

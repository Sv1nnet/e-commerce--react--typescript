import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import MainRoute from './components/routes/MainRoute';
import BasketRoute from './components/routes/BasketRoute';
import CatalogRoute from './components/routes/CatalogRoute';
import CheckoutRoute from './components/routes/CheckoutRoute';

const App: React.FC = () => {
  return (
    <>
      <h1>App</h1>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <MainRoute />
        </Route>

        <Route path="/basket">
          <BasketRoute />
        </Route>

        <Route path="/checkout">
          <CheckoutRoute />
        </Route>

        <Route path="/catalog">
          <CatalogRoute />
        </Route>
      </Switch>
    </>
  );
}

export default App;

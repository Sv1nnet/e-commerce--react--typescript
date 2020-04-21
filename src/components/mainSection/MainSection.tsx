import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainRoute from '@components/routes/MainRoute';
import CatalogRoute from '@components/routes/CatalogRoute';
import CheckoutRoute from '@components/routes/CheckoutRoute';

import './style.scss';

const MainSection: React.FC = () => {
  return (
    <main className="MainSection">
      <Switch>
        <Route exact path="/">
          <MainRoute />
        </Route>

        <Route path="/checkout">
          <CheckoutRoute />
        </Route>

        <Route path="/catalog">
          <CatalogRoute />
        </Route>
      </Switch>
    </main>
  );
};

export default MainSection;

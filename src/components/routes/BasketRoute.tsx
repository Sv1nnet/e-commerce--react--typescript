import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BasketPage from '../pages/BasketPage';
import Basket from '../basket/Basket';

const BasketRoute: React.FC = () => {
  return (
    <BasketPage>
      <Switch>
        <Route exact path="/">
          <Basket />
        </Route>
      </Switch>
    </BasketPage>
  );
}

export default BasketRoute;

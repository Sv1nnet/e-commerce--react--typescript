import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BasketPage from '../pages/BasketPage';
import Basket from '../basket/Basket';

interface IProps {
  children?: React.ReactNode;
}

const BasketRoute: React.FC<IProps> = () => {
  return (
    <BasketPage>
      <Switch>
        <Route exact path="/basket">
          <Basket />
        </Route>
      </Switch>
    </BasketPage>
  );
};

export default BasketRoute;

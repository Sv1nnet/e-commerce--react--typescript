import React from 'react';
import { Dispatch, Action } from 'redux';
import { Switch, Route } from 'react-router-dom';

import { IAddToCartAction, IRemoveFromCartAction } from '@/actions/cartActions';
import BasketPage from '../pages/BasketPage';
import Basket from '../basket/Basket';


interface IProps {
  addToCart: Dispatch<Action<IAddToCartAction>>;
  removeFromCart: Dispatch<Action<IRemoveFromCartAction>>;
  children?: React.ReactNode;
}


const BasketRoute: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
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

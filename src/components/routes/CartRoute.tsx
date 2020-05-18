import React from 'react';
import { Dispatch, Action } from 'redux';
import { Switch, Route } from 'react-router-dom';

import { TMappedDispatch } from '@components/app/App';
import { IAddToCartAction, IRemoveFromCartAction } from '@/actions/cartActions';
import CartPage from '../pages/CartPage';
import Cart from '../cart/Cart';


interface IProps extends TMappedDispatch {
  children?: React.ReactNode;
}


const BasketRoute: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
  return (
    <CartPage>
      <Switch>
        <Route exact path="/basket">
          <Cart />
        </Route>
      </Switch>
    </CartPage>
  );
};

export default BasketRoute;

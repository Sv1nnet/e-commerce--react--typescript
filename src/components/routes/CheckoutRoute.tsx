import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TMappedDispatch } from '@components/app/App';
import CheckoutPage from '../pages/CheckoutPage';
import Checkout from '../checkout/Checkout';


interface IProps extends TMappedDispatch {
  children?: React.ReactNode;
}

const CheckoutRoute: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
  return (
    <CheckoutPage>
      <Switch>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </CheckoutPage>
  );
};

export default CheckoutRoute;

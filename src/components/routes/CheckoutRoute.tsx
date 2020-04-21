import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CheckoutPage from '../pages/CheckoutPage';
import Checkout from '../checkout/Checkout';

interface IProps {
  children?: React.ReactNode;
}

const CheckoutRoute: React.FC<IProps> = () => {
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

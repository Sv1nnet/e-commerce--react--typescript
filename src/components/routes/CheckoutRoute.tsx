import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CheckoutPage from '../pages/CheckoutPage';
import Checkout from '../checkout/Checkout';

const CheckoutRoute: React.FC = () => {
  return (
    <CheckoutPage>
      <Switch>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </CheckoutPage>
  );
}

export default CheckoutRoute;

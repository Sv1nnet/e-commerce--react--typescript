import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CheckoutPage from '../pages/CheckoutPage';
import Checkout from '../checkout/Checkout';


interface IProps {
  children?: React.ReactNode;
}

const CheckoutRoute: React.FC<IProps> = () => (
  <CheckoutPage>
    <Switch>
      <Route exact path="/checkout">
        <Checkout />
      </Route>

      <Route path="/checkout/:any">
        <Redirect to="/checkout" />
      </Route>
    </Switch>
  </CheckoutPage>
);

export default CheckoutRoute;

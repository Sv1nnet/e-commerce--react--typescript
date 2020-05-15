import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { TMappedDispatch } from '@components/app/App';
import MainRoute from '@components/routes/MainRoute';
import CheckoutRoute from '@components/routes/CheckoutRoute';

import './style.scss';


interface IProps extends TMappedDispatch {
  className?: string;
}


const MainSection: React.FC<IProps> = ({ className, addToCart, removeFromCart }) => {
  return (
    <main className={`MainSection ${className}`}>
      <Switch>
        <Route exact path="/">
          <MainRoute addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>

        <Route path="/checkout">
          <CheckoutRoute addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>
      </Switch>
    </main>
  );
};

export default MainSection;

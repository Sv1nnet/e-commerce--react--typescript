import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { TMappedDispatch } from '@components/app/App';
import MainRoute from '@components/routes/MainRoute';
import CatalogRoute from '@components/routes/CatalogRoute';
import CheckoutRoute from '@components/routes/CheckoutRoute';

import './style.scss';


interface IProps extends TMappedDispatch {}


const MainSection: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
  return (
    <main className="MainSection">
      <Switch>
        <Route exact path="/">
          <MainRoute addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>

        <Route path="/checkout">
          <CheckoutRoute addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>

        <Route path="/catalog">
          <CatalogRoute addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>
      </Switch>
    </main>
  );
};

export default MainSection;

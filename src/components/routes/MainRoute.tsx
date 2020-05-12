import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { TMappedDispatch } from '@components/app/App';
import MainPage from '@components/pages/mainPage/MainPage';
import Main from '../main/Main';


interface IProps extends TMappedDispatch {
  children?: React.ReactNode;
}

const MainRoute: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
  return (
    <MainPage>
      <Switch>
        <Route exact path="/">
          <Main addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>
      </Switch>
    </MainPage>
  );
};

export default MainRoute;

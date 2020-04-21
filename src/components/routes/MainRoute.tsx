import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import Main from '../main/Main';

interface IProps {
  children?: React.ReactNode;
}

const MainRoute: React.FC<IProps> = () => {
  return (
    <MainPage>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </MainPage>
  );
};

export default MainRoute;

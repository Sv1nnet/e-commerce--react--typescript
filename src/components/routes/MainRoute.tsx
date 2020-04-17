import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import Main from '../main/Main';

const MainRoute: React.FC = () => {
  return (
    <MainPage>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </MainPage>
  );
}

export default MainRoute;

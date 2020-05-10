import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { TMappedDispatch } from '@components/app/App';
import CatalogPage from '../pages/CatalogPage';
import Catalog from '../catalog/Catalog';

type Match = {
  url: string;
};


interface IProps extends TMappedDispatch {
  children?: React.ReactNode;
}

const CatalogRoute: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
  const match = useRouteMatch<Match>();

  return (
    <CatalogPage>
      <Switch>
        <Route exact path={`${match.url}/:any`}>
          <h1>any</h1>
        </Route>
        <Route exact path={`${match.url}`}>
          <Catalog />
        </Route>
      </Switch>
    </CatalogPage>
  );
};

export default CatalogRoute;

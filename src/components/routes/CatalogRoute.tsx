import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import CatalogPage from '../pages/CatalogPage';
import Catalog from '../catalog/Catalog';

const CatalogRoute: React.FC = () => {
  const match = useRouteMatch();

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
}

export default CatalogRoute;

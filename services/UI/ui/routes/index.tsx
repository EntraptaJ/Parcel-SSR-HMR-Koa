// UI/ui/routes/index.tsx
import React, { FunctionComponent, ReactNode } from 'react';
import { Router } from '@reach/router';
import { AppRoutes, NavItem } from 'ui/Components/AppRoutes';

const HandleRoutes = (routes: NavItem[], parent?: string): ReactNode => {
  return routes.map(Route =>
    'options' in Route ? (
      HandleRoutes(Route.options, Route.path)
    ) : (
      <Route.Loadable
        path={parent ? `${parent}${Route.path}` : Route.path.replace(/(?<=\S)\//, '/*')}
        key={parent ? `${parent}${Route.path}` : Route.path}
      />
    ),
  );
};

type RoutesType = FunctionComponent;

export const Routes: RoutesType = () => {
  return (
    <>
      <Router component='main' className='app__content mdc-drawer-app-content'>
        {HandleRoutes(AppRoutes)}
      </Router>
    </>
  );
};

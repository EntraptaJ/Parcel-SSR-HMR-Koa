// UI/ui/routes/index.tsx
import React, { FunctionComponent, ReactNode } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { AppRoutes, NavItem } from 'ui/Components/AppRoutes';

const Parent: FunctionComponent<RouteComponentProps> = ({ children }) => <>{children}</>;

const HandleRoutes = (routes: NavItem[]): ReactNode[] => {
  return routes.map(Route =>
    Route.children ? (
      <Parent path={Route.path} key={Route.path}>
        <Route.Loadable path='/' key={Route.path} />
        {...HandleRoutes(Route.children)}
      </Parent>
    ) : (
      <Route.Loadable path={Route.path} key={Route.path} />
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

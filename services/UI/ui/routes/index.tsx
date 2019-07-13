// UI/ui/routes/index.tsx
import React, { FunctionComponent, ComponentClass } from 'react';
import Load, { LoadableComponent, Options } from 'react-loadable';
import { Router, RouteComponentProps } from '@reach/router';
import { Loading } from 'ui/Components/LoadingComponent';

const MyLoadable = (opts: any) =>
  Load(
    Object.assign(
      {
        loading: Loading,
        delay: 200,
        timeout: 10000,
      },
      opts,
    ),
  );

interface AppRoute {
  path: string;
  Loadable: ComponentClass<RouteComponentProps> | FunctionComponent<RouteComponentProps> & LoadableComponent;
}

const AppRoutes: AppRoute[] = [
  {
    path: '/',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Home'),
      modules: ['routes/Home/index.tsx'],
    }),
  },
  {
    path: '/Example',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Example'),
      modules: ['routes/Example/index.tsx'],
    }),
  },
  {
    path: '/Redirect',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/RedirectExample'),
      modules: ['routes/RedirectExample/index.tsx'],
    }),
  },
];

/*
const Component = Loadable({
  loader: () => import('ui/routes/Home'),
  loading: Loading,
  modules: [`routes/Home/index.tsx`],
}); */

type RoutesType = FunctionComponent;

export const Routes: RoutesType = () => {
  return (
    <>
      <Router>
        {AppRoutes.map(({ Loadable, path }) => (
          <Loadable path={path} />
        ))}
      </Router>
    </>
  );
};

// UI/ui/Components/AppRoutes.tsx
import { FunctionComponent, ComponentClass } from 'react';
import Load, { LoadableComponent } from 'react-loadable';
import { RouteComponentProps } from '@reach/router';
import { Loading } from 'ui/Components/LoadingComponent';

export const MyLoadable = (opts: any) =>
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

export interface NavItem {
  /**
   * Label to use in the UI
   */
  label: string;

  /**
   * Path for the router to use
   */
  path: string;

  /**
   * Path for Links and Navigates to use
   */
  to: string;

  /**
   * Loadable Component for the Route
   */
  Loadable:
    | ComponentClass<RouteComponentProps> & LoadableComponent
    | FunctionComponent<RouteComponentProps> & LoadableComponent;

  /**
   * Sub routes
   */
  children?: NavItem[];
}

export const AppRoutes: NavItem[] = [
  {
    path: '/',
    to: '/',
    label: 'Home',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Home'),
      modules: ['routes/Home/index.tsx'],
    }),
  },
  {
    path: 'Example',
    label: 'Example',
    to: '/Example',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Example'),
      modules: ['routes/Example/index.tsx'],
    }),
    children: [
      {
        path: 'Example1',
        label: 'Example 1',
        to: '/Example/Example1',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Example/Example1'),
          modules: ['routes/Example/Example1/index.tsx'],
        }),
      },
      {
        path: 'Example2',
        label: 'Example 2',
        to: '/Example/Example2',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Example/Example2'),
          modules: ['routes/Example/Example2/index.tsx'],
        }),
      },
    ],
  },
  {
    path: '/TestForm',
    label: 'Test Form',
    to: '/Redirect',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/TestForm'),
      modules: ['routes/TestForm/index.tsx'],
    }),
  },
];

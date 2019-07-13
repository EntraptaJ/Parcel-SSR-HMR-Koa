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

export interface ChildNavItem {
  label: string;
  path: string;
  Loadable:
    | ComponentClass<RouteComponentProps> & LoadableComponent
    | FunctionComponent<RouteComponentProps> & LoadableComponent;
}

interface ParentNavItem {
  label: string;
  path: string;
  options: NavItem[];
}

export type NavItem = ChildNavItem | ParentNavItem;

export const AppRoutes: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Home'),
      modules: ['routes/Home/index.tsx'],
    }),
  },
  {
    path: '/Example',
    label: 'Example',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Example'),
      modules: ['routes/Example/index.tsx'],
    }),
  },
  {
    path: '/Redirect',
    label: 'Redirect Example',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/RedirectExample'),
      modules: ['routes/RedirectExample/index.tsx'],
    }),
  },
  {
    path: '/TestForm',
    label: 'Test Form',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/TestForm'),
      modules: ['routes/TestForm/index.tsx'],
    }),
  },
];

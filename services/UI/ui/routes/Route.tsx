// UI/ui/routes/Route.tsx
import Loadable from 'react-loadable';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Loading } from 'ui/Components/LoadingComponent';

interface RouteProps extends RouteComponentProps {
  loader(): Promise<FunctionComponent<RouteComponentProps> | { default: FunctionComponent<RouteComponentProps> }>;
  route: string;
}

type RouteType = FunctionComponent<RouteProps>;

export const Route: RouteType = ({ loader, route }) => {
  const Component = Loadable(Object.assign({
      loader,
      loading: Loading,
      delay: 200,
      timeout: 10000,
    }));

  // @ts-ignore
  return <Component path={route} />;
};

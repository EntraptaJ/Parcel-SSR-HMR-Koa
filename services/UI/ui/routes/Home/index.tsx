// UI/ui/routes/Home/index.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

type HomeRouteType = FunctionComponent<RouteComponentProps>;

const HomeRoute: HomeRouteType = () => {
  return <h1>Home</h1>;
};

export default HomeRoute;

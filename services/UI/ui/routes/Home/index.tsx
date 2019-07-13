// UI/ui/routes/Home/index.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

type HomeRouteType = FunctionComponent<RouteComponentProps>;

const HomeRoute: HomeRouteType = () => {
  return <p>Home Test</p>;
};

export default HomeRoute;

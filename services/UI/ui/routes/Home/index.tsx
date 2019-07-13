// UI/ui/routes/Home/index.tsx
import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { PropContext } from 'ui/Components/PropProvider';
import { useTitle } from 'ui/Components/HeadProvider';

type HomeRouteType = FunctionComponent<RouteComponentProps>;

const HomeRoute: HomeRouteType = () => {
  const { useProps, props } = useContext(PropContext);
  useTitle('Home Page')
  useProps(async () => ({ title: 'Home' }));
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

export default HomeRoute;

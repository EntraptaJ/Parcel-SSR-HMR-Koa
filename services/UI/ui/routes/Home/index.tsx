// UI/ui/routes/Home/index.tsx
import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { PropContext } from 'ui/Components/PropProvider';
import { useTitle } from 'ui/Components/HeadProvider';
import { BoxStyle } from 'ui/lib/styles';
import { Typography } from '@rmwc/typography';

type HomeRouteType = FunctionComponent<RouteComponentProps>;

const HomeRoute: HomeRouteType = () => {
  const { useProps, props } = useContext(PropContext);
  useTitle('Home Page');
  useProps(async () => ({ title: 'Home' }));
  return (
    <div style={BoxStyle}>
      <Typography use='headline4'>
        Home Page
      </Typography>
      <Typography use='subtitle2' theme='textSecondaryOnBackground'>
        by KristianFJones
      </Typography>
      <Typography use='body1'>
        This is a demo of self hosted, Parcel SSR, with Client and Server HMR. Code split bundles. and a few extra treats.
      </Typography>
    </div>
  );
};

export default HomeRoute;

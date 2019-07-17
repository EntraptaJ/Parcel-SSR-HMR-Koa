// UI/ui/routes/Query/index.tsx
import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import HELLOWORLDGQL from './helloWorld.graphql';
import { Typography } from '@rmwc/typography';
import { BoxStyle } from 'ui/lib/styles';

type QueryRouteType = FunctionComponent;

const QueryRoute: QueryRouteType = () => {
  const { data } = useQuery<{ helloWorld: string }>(HELLOWORLDGQL);

  return (
    <div style={BoxStyle}>
      <Typography use='headline4'>{data && data.helloWorld ? data.helloWorld : 'Loading'}</Typography>
    </div>
  );
};

export default QueryRoute;

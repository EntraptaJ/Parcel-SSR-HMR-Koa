// UI/ui/routes/Example/index.tsx
import React, { FunctionComponent } from 'react';
import { Typography } from '@rmwc/typography';
import { BoxStyle } from 'ui/lib/styles';

interface ExampleRouteProps {}

type ExampleRouteType = FunctionComponent<ExampleRouteProps>;

const ExampleRoute: ExampleRouteType = () => {
  return (
    <div style={BoxStyle}>
      <Typography use='headline4'>Example Route</Typography>
    </div>
  );
};

export default ExampleRoute;

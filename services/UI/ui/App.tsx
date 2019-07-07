import React, { FunctionComponent } from 'react';
import { Routes } from 'ui/routes';

interface AppProps {}

type AppType = FunctionComponent<AppProps>;

export const App: AppType = () => {
  return (
    <>
      <Routes />
    </>
  );
};

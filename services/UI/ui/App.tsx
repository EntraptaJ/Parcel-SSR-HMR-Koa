// UI/ui/App.tsx
import React, { FunctionComponent } from 'react';
import { Routes } from 'ui/routes';

interface AppProps {}

type AppType = FunctionComponent<AppProps>;

const App: AppType = () => {
  return (
    <>
      <Routes />
    </>
  );
};

export default App;

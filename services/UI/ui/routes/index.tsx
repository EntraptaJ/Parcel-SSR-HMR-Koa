// UI/ui/routes/index.tsx
import React from 'react';
import Loadable from 'react-loadable';
import { Router } from '@reach/router';

const LoadingDiv = () => <div>Loading</div>;

const HomeRoute = Loadable({
  loader: () => import('ui/routes/Home'),
  loading: LoadingDiv,
  modules: ['routes/Home/index.tsx'],
});

export const Routes = () => {
  return (
    <Router>
      <HomeRoute path='/' />
    </Router>
  );
};

// UI/ui/App.tsx
import React, { FunctionComponent, useState, useMemo } from 'react';
import { Routes } from 'ui/routes';
import './App.css';
import Loadable from 'react-loadable';
import { Loading } from './Components/LoadingComponent';
import { AppRoutes } from './Components/AppRoutes';
import { globalHistory } from '@reach/router';

const AppBar = Loadable({
  loader: () => import('ui/Components/Layout/AppBar'),
  modules: ['Components/Layout/AppBar/index.tsx'],
  loading: Loading,
});

const Nav = Loadable({
  loader: () => import('ui/Components/Layout/Nav'),
  modules: ['Components/Layout/Nav/index.tsx'],
  loading: Loading,
});

type AppType = FunctionComponent;

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const App: AppType = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobileState = useMemo(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false), [
    typeof window === 'undefined' ? [] : window.innerWidth || window.addEventListener('resize', () => true),
  ]);

  globalHistory.listen(async () => {
    await timeout(50);
    setMenuOpen(false);
  });

  return (
    <>
      <AppBar onNavClick={() => setMenuOpen(!menuOpen)} appName='Parcel' />
      <div className='main-content' style={{ display: 'flex', flex: '1 1', position: 'relative' }}>
        <Nav
          navItems={AppRoutes}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          dismissible={!isMobileState}
          modal={isMobileState}
        />
        <Routes />
      </div>
    </>
  );
};

export default App;

// UI/ui/App.tsx
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Routes } from 'ui/routes';
import './App.css'
import Loadable from 'react-loadable'
import { Loading } from './Components/LoadingComponent';
import { AppRoutes } from './Components/AppRoutes';
const AppBar = Loadable({
  loader: () => import('ui/Components/Layout/AppBar'),
  modules: ['Components/Layout/AppBar/index.tsx'],
  loading: Loading
})

const Nav = Loadable({
  loader: () => import('ui/Components/Layout/Nav'),
  modules: ['Components/Layout/Nav/index.tsx'],
  loading: Loading
})

interface AppProps {}

type AppType = FunctionComponent<AppProps>;

const App: AppType = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState(true);
  const doSizeCheck = (initial?: boolean) => {
    const isMobile = window.innerWidth < 640;

    if (isMobileState !== isMobile) {
      setIsMobileState(isMobile);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck());

    doSizeCheck(false);
  }, []);

  return (
    <>
      {/** @ts-ignore */}
      <AppBar onNavClick={() => setMenuOpen(!menuOpen)} appName='Parcel' />
      <Nav
        navItems={AppRoutes}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        dismissible={!isMobileState}
        modal={isMobileState}
      />
      <Routes />
    </>
  );
};

export default App;

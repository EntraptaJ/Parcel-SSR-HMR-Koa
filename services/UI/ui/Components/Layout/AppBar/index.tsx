// UI/ui/Components/Layout/AppBar/index.tsx
import React, { FunctionComponent } from 'react';
import {
  TopAppBar,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar';
// CSS
import './AppBar.css';
import { Link } from '@reach/router';

interface AppBarProps {
  appName: string;
  onNavClick: (evt: React.SyntheticEvent<HTMLElement>) => void;
}

type AppBarType = FunctionComponent<AppBarProps>;

const AppBar: AppBarType = ({ onNavClick, appName }) => {
  return (
    <>
      <TopAppBar fixed className='app__top-app-bar'>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon onClick={onNavClick} icon='menu' />
            <TopAppBarTitle tag={Link} {...{ to: '/' }}>
              {appName}
            </TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
};

export default AppBar;

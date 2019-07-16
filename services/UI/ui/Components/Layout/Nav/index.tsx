// UI/ui/Components/Layout/Nav/index.tsx
import React, { FunctionComponent } from 'react';
import { DrawerProps, Drawer, DrawerContent } from '@rmwc/drawer';
import { List, ListItem, CollapsibleList, SimpleListItem } from '@rmwc/list';
import { NavItem } from 'ui/Components/AppRoutes';
import './Nav.css';
import { Link } from '@reach/router';

export const handleNavItems = (routes: NavItem[], closeNav: () => void): JSX.Element[] =>
  routes.map(route =>
    route.children ? (
      <CollapsibleList key={route.label} handle={<SimpleListItem text={route.label} metaIcon='chevron_right' />}>
        {handleNavItems(route.children, closeNav)}
      </CollapsibleList>
    ) : (
      <ListItem key={route.label} tag={Link} {...{ to: route.to }} onClick={closeNav}>
        {route.label}
      </ListItem>
    ),
  );

interface NavProps extends DrawerProps {
  navItems: NavItem[];
  closeNav: () => void;
}

type NavType = FunctionComponent<NavProps>;

const Nav: NavType = ({ navItems, closeNav, ...props }) => {
  const NavItems = handleNavItems(navItems, closeNav);

  return (
    <Drawer id='main-nav' {...props}>
      <DrawerContent>
        <List>{NavItems}</List>
      </DrawerContent>
    </Drawer>
  );
};

export default Nav;

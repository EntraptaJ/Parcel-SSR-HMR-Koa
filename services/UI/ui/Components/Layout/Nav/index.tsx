// UI/ui/Components/Layout/Nav/index.tsx
import React, { FunctionComponent } from 'react';
import { DrawerProps, Drawer, DrawerContent } from '@rmwc/drawer';
import { List } from '@rmwc/list';
import { CollapsibleList, SimpleListItem } from '@rmwc/list';
import { NavItem } from './NavItem';
import './Nav.css'

export interface NavItemType {
  label: string;

  path: string;

  options?: NavItemType[];
}

export const handleNavItems = (items: NavItemType[]): JSX.Element[] =>
  items.map(item =>
    item.options ? (
      <CollapsibleList key={item.label} handle={<SimpleListItem text={item.label} metaIcon='chevron_right' />}>
        {handleNavItems(item.options)}
      </CollapsibleList>
    ) : (
      <NavItem key={item.label} {...item} />
    ),
  );

interface NavProps extends DrawerProps {
  navItems: NavItemType[];
}

type NavType = FunctionComponent<NavProps>;

const Nav: NavType = ({ navItems, ...props }) => {
  return (
    <Drawer id='main-nav' {...props}>
      <DrawerContent>
        <List>{handleNavItems(navItems)}</List>
      </DrawerContent>
    </Drawer>
  );
};

export default Nav

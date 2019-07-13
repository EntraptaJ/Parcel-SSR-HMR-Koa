// UI/ui/Components/Layout/Nav/NavItem/index.tsx
import React, { FunctionComponent } from 'react';
import { ListItem } from '@rmwc/list';
import { AppRoutes, NavItem as RouteItem } from 'ui/Components/AppRoutes';
import { navigate } from '@reach/router';

interface NavItemProps {
  label: string;

  path: string;
}

const findRoute = (path: string) => {
  let routeItem: RouteItem | undefined;
  AppRoutes.map(route => {
    if ('options' in route)
      routeItem = route.options.find(route2 => `${route.path}${route2.path}` === path || route.path === path);
    else if (route.path === path) routeItem = route;
  });
  return routeItem;
};

type NavItemType = FunctionComponent<NavItemProps>;

export const NavItem: NavItemType = ({ label, path }) => {
  const RouteItem = findRoute(path);
  if (!RouteItem) return <ListItem onClick={() => navigate(path)}>{label}</ListItem>;
  return (
    <ListItem onMouseOver={() => 'Loadable' in RouteItem && RouteItem.Loadable.preload()} onClick={() => navigate(path)}>
      {label}
    </ListItem>
  );
};

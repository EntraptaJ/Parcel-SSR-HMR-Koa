// UI/ui/Components/PropProvider/index.tsx
import React, { createContext, ReactNode, useState } from 'react';
import { Context } from 'koa';
import { globalHistory } from '@reach/router';

export let Props: Promise<any>;

export interface PathPropsObject {
  path: string;
  props: any;
}

export const resetProps = () => {
  // @ts-ignore
  Props = undefined;
};

export type getProp = (ctx?: Context) => Promise<any>;

interface PropContextType {
  props: any;
  sessionProps: PathPropsObject[];
  useProps: (prop: getProp) => void;
  ctx?: Context;
}

export const PropContext = createContext<PropContextType>({
  useProps: props => {
    Props = props();
  },
  // @ts-ignore
  props: Props,
  sessionProps: [],
  ctx: undefined,
});

interface PropProviderProps {
  children: ReactNode;
  ctx?: Context;
  props: any;
  sessionProps: PathPropsObject[];
}

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PropProvider = (prop: PropProviderProps) => {
  const { ctx, children, sessionProps } = prop;
  const [props, setProps] = useState(prop.props);
  const useProps = (newProp: getProp) => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === (ctx ? ctx.path : globalHistory.location.pathname));

    if (oldProps) Props = oldProps.props;
    else Props = newProp(ctx);
  };

  globalHistory.listen(async c => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === c.location.pathname);

    if (oldProps) setProps(oldProps.props || {});
    else {
      await timeout(50);
      if (typeof (await Props) === 'undefined') return;
      sessionProps.push({ path: c.location.pathname, props: (await Props) || {} });
      setProps((await Props) || {});
    }
  });

  return (
    <PropContext.Provider
      value={{
        useProps,
        props,
        sessionProps,
        ctx,
      }}
    >
      {children}
    </PropContext.Provider>
  );
};

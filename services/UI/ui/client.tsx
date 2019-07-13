import React from 'react';
import { Renderer, hydrate, render as ReactDOMRender } from 'react-dom';
import AppComponent from 'ui/App';
import { preloadReady } from 'react-loadable';
import { PropProvider } from 'ui/Components/PropProvider';
import { HeadProvider } from 'ui/Components/HeadProvider';

const hashes: string[] = [];

const render = async (renderFunction: Renderer, App: typeof AppComponent) => {
  renderFunction(
    <PropProvider sessionProps={window.APP_STATE.SESSIONPROPS} props={window.APP_STATE.PROPS}>
      <HeadProvider tags={[]} hashes={hashes}>
        <App />
      </HeadProvider>
    </PropProvider>,
    document.getElementById('app'),
  );
};

preloadReady().then(() => render(hydrate, AppComponent));

const hot = (module as any).hot;
if (hot && hot.accept) {
  hot.accept(() => {
    render(ReactDOMRender, require('ui/App'));
  });
}

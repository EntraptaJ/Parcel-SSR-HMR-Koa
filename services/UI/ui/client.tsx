import React from 'react';
import { Renderer, hydrate, render as ReactDOMRender } from 'react-dom';
import { App as AppComponent } from 'ui/App';
import { preloadReady } from 'react-loadable';

const render = async (renderFunction: Renderer, App: typeof AppComponent) => {
  renderFunction(<App />, document.getElementById('app'));
};

preloadReady().then(() => render(hydrate, AppComponent));

const hot = (module as any).hot;
if (hot && hot.accept) {
  hot.accept(() => {
    render(ReactDOMRender, require('ui/App').App);
  });
}

import React from 'react';
import { Renderer, hydrate, render as ReactDOMRender } from 'react-dom';
import AppComponent from 'ui/App';
import { preloadReady } from 'react-loadable';
import { PropProvider } from 'ui/Components/PropProvider';
import { HeadProvider, clearHead } from 'ui/Components/HeadProvider';
import { globalHistory } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { initApollo } from 'ui/lib/initApollo';

const hashes: string[] = [];

const render = async (renderFunction: Renderer, App: typeof AppComponent) => {
  const client = initApollo({
    baseUrl: 'http://localhost',
    initialState: window.APP_STATE.APOLLO_STATE,
  });
  renderFunction(
    <ApolloProvider client={client}>
      <HeadProvider tags={[]} hashes={hashes}>
        <PropProvider sessionProps={window.APP_STATE.SESSIONPROPS} props={window.APP_STATE.PROPS}>
          <App />
        </PropProvider>
      </HeadProvider>
    </ApolloProvider>,
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

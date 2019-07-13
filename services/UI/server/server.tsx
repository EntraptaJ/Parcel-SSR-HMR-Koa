// UI/server/server.ts
import React from 'react';
import { Capture, preloadAll } from 'react-loadable';
import { ServerLocation, isRedirect } from '@reach/router';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { readJSON } from 'fs-extra';
import { Context } from 'koa';
import App from 'ui/App';
import { PropProvider, PathPropsObject, Props, resetProps } from 'ui/Components/PropProvider';
import { HeadProvider } from 'ui/Components/HeadProvider';

export interface AppState {
  PROPS: any;
  SESSIONPROPS: PathPropsObject[];
}

export const uiServer = async (ctx: Context) => {
  await preloadAll();
  await resetProps();
  ctx.respond = false;
  ctx.status = 200;
  const manifestFile = `${__dirname}/../public/parcel-manifest.json`;
  const cssFile = `${__dirname}/../CSS.json`;
  const [parcelManifest, cssManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
    readJSON(cssFile) as Promise<{ [any: string]: string }>,
  ]);
  interface Source {
    src: string;
    type: 'script' | 'style';
  }

  const sources: Source[] = [
    { type: 'script', src: parcelManifest['client.tsx'] },
    { type: 'style', src: parcelManifest['App.css'] },
    { type: 'style', src: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500'},
    { type: 'style', src: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  ];
  let modules: string[] = [];
  let sessionProps: PathPropsObject[] = [];
  let localProps: any;
  let head: JSX.Element[] = [];
  let hashes: string[] = [];

  try {
    // Prerender to get Modules and shit
    renderToString(
      <ServerLocation url={ctx.url}>
        <Capture report={moduleName => modules.push(moduleName)}>
          <PropProvider ctx={ctx} sessionProps={sessionProps} props={{}}>
            <HeadProvider tags={head} hashes={hashes}>
              <App />
            </HeadProvider>
          </PropProvider>
        </Capture>
      </ServerLocation>,
    );
    localProps = await Props;
  } catch (e) {
    if (isRedirect(e)) {
      ctx.redirect(e.uri);
      ctx.res.end();
      return;
    }

    localProps = await Props;
  }

  modules.map(moduleName =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => a === moduleName || cssManifest[moduleName] === b)
      .map(([modulePath, file]) => sources.unshift({ src: file, type: file.includes('.js') ? 'script' : 'style' })),
  );

  let componentStream = renderToNodeStream(
    <ServerLocation url={ctx.url}>
      <PropProvider ctx={ctx} sessionProps={sessionProps} props={localProps}>
        <HeadProvider tags={head} hashes={hashes}>
          <App />
        </HeadProvider>
      </PropProvider>
    </ServerLocation>,
  );

  const Head = renderToString(
    <head>
      <link rel='manifest' href='/manifest.webmanifest' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {...head}
      {sources && sources.map(({ src, type }, index) => <link rel='preload' href={src} as={type} key={index} />)}
      {sources &&
        sources
          .filter(({ type }) => type === 'style')
          .map(({ src }, index) => <link rel='stylesheet' type='text/css' href={src} key={index} />)}
    </head>,
  );

  const htmlStart = `
  <!doctype html>
    <html>
      ${Head}
      <body class="mdc-typography">
      <div id="app">`;

  ctx.res.write(htmlStart);
  componentStream.pipe(
    ctx.res,
    { end: false },
  );

  const htmlEnd = `</div>
    <script>
      window.APP_STATE = ${JSON.stringify({ SESSIONPROPS: sessionProps, PROPS: localProps })}
    </script>
    ${renderToString(
      <>
        {' '}
        {sources &&
          sources
            .filter(({ type }) => type === 'script')
            .reverse()
            .map(({ src }, index) => <script async type='text/javascript' charSet='utf-8' key={index} src={src} />)}
      </>,
    )}
  </body>
  </html>`;

  componentStream.on('end', () => {
    ctx.res.write(htmlEnd);

    ctx.res.end();
  });
  return;
};

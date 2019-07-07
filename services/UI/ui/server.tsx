// UI/UI/server.tsx
import { Context } from 'koa';
import React from 'react';
import { App } from 'ui/App';
import { ServerLocation } from '@reach/router';
import { preloadAll, Capture } from 'react-loadable';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { readJSON } from 'fs-extra';

export async function uiServer(ctx: Context) {
  ctx.respond = false;
  ctx.status = 200
  await preloadAll();
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
  ];

  let modules: string[] = [];


  // Prerender to get Modules and shit
  renderToString(
    <ServerLocation url={ctx.url}>
      <Capture report={moduleName => modules.push(moduleName)}>
        <App />
      </Capture>
    </ServerLocation>,
  );

  modules.map(moduleName =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => a === moduleName || cssManifest[moduleName] === b)
      .map(([modulePath, file]) => sources.unshift({ src: file, type: file.includes('.js') ? 'script' : 'style' })),
  );

  const componentStream = renderToNodeStream(
    <ServerLocation url={ctx.url}>
      <App />
    </ServerLocation>,
  );

  const Head = renderToString(
    <head>
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
      <head>
        ${Head}
      </head>
      <body>
      <div id="app">`;

  ctx.res.write(htmlStart);
  componentStream.pipe(
    ctx.res,
    { end: false },
  );

  const htmlEnd = `</div>
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
}

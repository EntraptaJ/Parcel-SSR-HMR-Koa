import { Context } from 'koa';
import { readJSON } from 'fs-extra';
import { preloadAll, preloadReady } from 'react-loadable'

const loadServer = async () => {
  const manifest = await readJSON(`${__dirname}/parcel-manifest.json`);
  await preloadAll()
  await preloadReady()
  return require(`${__dirname}${manifest['server.tsx']}`);
};

export const uiServer = async (ctx: Context) => {
  let { uiServer } = await loadServer();
  if (process.env.NODE_ENV === 'development') {
    const chokidar = await import('chokidar');
    chokidar
      .watch(`${__dirname}/parcel-manifest.json`, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 100 },
      })
      .on('all', async () => {
        process.stdout.write('Reloading UI Server...');
        uiServer = (await loadServer()).uiServer;
        process.stdout.write('✅\n');
      });
  }

  return uiServer(ctx);
};

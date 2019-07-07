import { Context } from 'koa';
import { readJSON } from 'fs-extra';

const loadServer = async () => {
  const manifest = await readJSON(`${__dirname}/parcel-manifest.json`);
  return require(`${__dirname}${manifest['server.tsx']}`);
};

export const uiServer = async (ctx: Context) => {
  let { uiServer } = await loadServer();
  if (process.env.NODE_ENV === 'development') {
    const chokidar = await import('chokidar');
    chokidar
      .watch(`${__dirname}/server.*`, {
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

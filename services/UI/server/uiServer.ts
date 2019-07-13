import { Context } from 'koa';
import { readJSON } from 'fs-extra';
import chokidar from 'chokidar';

const loadServer = async () => {
  const manifest = await readJSON(`${__dirname}/parcel-manifest.json`);
  return require(`${__dirname}${manifest['server.tsx']}`);
};

export default async (ctx: Context) => {
  let { uiServer } = await loadServer();

  if (process.env.NODE_ENV === 'development')
    chokidar
      .watch(`dist/server/parcel-manifest.json`, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 100 },
      })
      .on('all', async () => {
        process.stdout.write('Reloading UI Server...');
        uiServer = (await loadServer()).uiServer;
        process.stdout.write('✅\n');
      });

  return uiServer(ctx);
};

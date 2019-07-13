import { copy, mkdir, remove, writeJSON } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';
import run from './run';
import { entryPointHandler, CSS } from './CSSManifest';
import { buildManifest } from './buildManifest';

export async function build(watch: boolean = false) {
  await remove('dist');
  await mkdir('dist');

  await copy('public', 'dist/public');

  await copy('package.json', 'dist/package.json');
  await copy('package-lock.json', 'dist/package-lock.json');

  const bundler = new ParcelBundler('ui/client.tsx', {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: true,
    sourceMaps: false,
    cache: false,
  });

  bundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  process.env['BABEL_ENV'] = 'server'
  const serverbundler = new ParcelBundler(['server/index.ts', 'server/server.urls'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    contentHash: true,
    sourceMaps: false,
    cache: false
  });

  serverbundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  await bundler.bundle();
  await serverbundler.bundle();
  const webManifest = await buildManifest();
  await writeJSON('dist/public/manifest.webmanifest', webManifest);
  await writeJSON('dist/CSS.json', CSS);
}

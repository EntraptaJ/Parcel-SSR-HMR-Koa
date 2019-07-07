import { copy, mkdir, remove, writeJSON } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';
import run from './run';
import { entryPointHandler, CSS } from './CSSManifest';

export async function build(watch: boolean = false) {
  await remove('dist');
  await mkdir('dist');

  await copy('public', 'dist/public');

  await copy('package.json', 'dist/package.json');
  await copy('package-lock.json', 'dist/package-lock.json');

  await run('tsc --build server/tsconfig.json');

  const bundler = new ParcelBundler('ui/client.tsx', {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: true,
    cache: false,
    sourceMaps: false
  });

  bundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  const serverbundler = new ParcelBundler(['ui/server.urls'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    bundleNodeModules: true,
    contentHash: true,
    cache: false,
    sourceMaps: false
    
  });

  serverbundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  await bundler.bundle();
  await serverbundler.bundle();
  await writeJSON('dist/CSS.json', CSS);
}

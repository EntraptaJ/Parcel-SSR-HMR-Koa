import { ParcelBundle } from 'parcel-bundler';
import path from 'path';

export let CSS: { [any: string]: string } = {};

export const entryPointHandler = (bundle: any) => {
  const dir = 'dist/public';
  const publicURL = '/';

  const manifestValue = {};
  feedManifestValue(bundle, manifestValue, publicURL);
};

/**
 * Feed the manifest exploring childBundles recursively
 * @param {Bundle} bundle
 * @param {Object} manifestValue
 * @param {string} publicURL
 */
export const feedManifestValue = (bundle: ParcelBundle, manifestValue: any, publicURL: string) => {
  let output = path.join(publicURL, path.basename(bundle.name));

  const input = bundle.entryAsset
    ? bundle.entryAsset.relativeName
    : bundle.assets.size
    ? bundle.assets.values().next().value.relativeName
    : null;
  if (input && !manifestValue[input]) {
    manifestValue[input] = output;
    if (output.includes('css')) CSS[bundle.parentBundle.entryAsset.relativeName] = output;
  }
  bundle.childBundles.forEach(bundle => feedManifestValue(bundle, manifestValue, publicURL));
};

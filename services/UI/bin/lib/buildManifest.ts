// UI/bin/lib/buildManifest.ts
import * as config from '../../config'

export const buildManifest = async () => {
  const { APPNAME } = config
  const webManifest = { name: APPNAME }
  return webManifest
}
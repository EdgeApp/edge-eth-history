import { makeConfig } from 'cleaner-config'
import { asNumber, asObject, asOptional, asString } from 'cleaners'

export const asConfig = asObject({
  dbFullpath: asOptional(asString, 'http://username:password@localhost:5984'),
  httpHost: asOptional(asString, '127.0.0.1'),
  httpPort: asOptional(asNumber, 8008),
  ethGasStationApiKey: asOptional(asString, ''),
  mempoolSpaceApiKey: asOptional(asString, ''),
  earnApiKey: asOptional(asString, ''),
  timeBetweenCyclesInSeconds: asOptional(asNumber, 45)
})

export const config = makeConfig(asConfig, 'serverConfig.json')

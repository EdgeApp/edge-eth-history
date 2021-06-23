import { asNumber, asObject, asOptional } from 'cleaners'

import { config } from '../utils/config'
import { apiFetchCall } from '../utils/utils'

export interface GasInfo {
  fast: number
  fastest: number
  safeLow: number
  average: number
}

const asEthGasStationResponse = asObject({
  fast: asNumber,
  fastest: asNumber,
  safeLow: asNumber,
  average: asNumber,
  block_time: asNumber,
  speed: asNumber,
  safeLowWait: asNumber,
  avgWait: asNumber,
  fastWait: asNumber,
  fastestWait: asNumber,
  gasPriceRange: asObject({
    asOptional
  })
})

const url = `${config.ethGasStationBaseURI}/api/ethgasAPI.json?api-key=${config.ethGasStationApiKey}`

export const ethGasStationCall = apiFetchCall(
  asEthGasStationResponse,
  url,
  'Eth Gas Station'
)

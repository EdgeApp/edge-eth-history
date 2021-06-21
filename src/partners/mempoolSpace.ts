import { asNumber, asObject } from 'cleaners'

import { config } from '../utils/config'
import { apiFetchCall } from '../utils/utils'

export interface BitcoinInfo {
  fastestFee: number
  halfHourFee: number
  hourFee: number
  minimumFee: number
}

const asMempoolSpaceResponse = asObject({
  fastestFee: asNumber,
  halfHourFee: asNumber,
  hourFee: asNumber,
  minimumFee: asNumber
})

const url = `${config.mempoolSpaceBaseURI}/api/v1/fees/recommended`

export const mempoolSpaceCall = apiFetchCall(
  asMempoolSpaceResponse,
  url,
  'Mempool.space'
)

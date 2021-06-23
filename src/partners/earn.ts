import { asArray, asNumber, asObject } from 'cleaners'

import { config } from '../utils/config'
import { apiFetchCall } from '../utils/utils'

export interface EarnInfo {
  fees: [
    {
      minFee: number
      maxFee: number
      dayCount: number
      memCount: number
      minDelay: number
      maxDelay: number
      minMinutes: number
      maxMinutes: number
    }
  ]
}

const asEarnResponse = asObject({
  fees: asArray(
    asObject({
      minFee: asNumber,
      maxFee: asNumber,
      dayCount: asNumber,
      memCount: asNumber,
      minDelay: asNumber,
      maxDelay: asNumber,
      minMinutes: asNumber,
      maxMinutes: asNumber
    })
  )
})

const url = `${config.earnBaseURI}/api/v1/fees/list`

export const earnCall = apiFetchCall(asEarnResponse, url, 'Earn')

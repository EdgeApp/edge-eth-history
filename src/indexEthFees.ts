import { asNumber, asObject, asOptional } from 'cleaners'
import fetch from 'node-fetch'

import { config } from './config'

const mylog = console.log

export interface GasInfo {
  fast: number
  fastest: number
  safeLow: number
  average: number
  source?: string
}

export interface GasInfo2 {
  fast: number
  fastest: number
  safeLow: number
  standard?: number
  average?: number
  source?: string
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

export const ethGasStationCall = async (): Promise<GasInfo | null> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const url = `https://ethgasstation.info/api/ethgasAPI.json?api-key=${config.ethGasStationApiKey}`
  try {
    const result = await fetch(url, options)
    if (result.ok === false) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      mylog(`Eth Gas Station returned code ${result.status}`)
    }
    const jsonObj = await result.json()
    asEthGasStationResponse(jsonObj)
    return jsonObj
  } catch (e) {
    mylog('Error is:', e)
    return null
  }
}
export const etherChainCall = async (): Promise<GasInfo2> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const url = `https://etherchain.org/api/gasPriceOracle`
  const result = await fetch(url, options)
  return result.json()
}

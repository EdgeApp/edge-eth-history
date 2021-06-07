import fetch from 'node-fetch'

import { config } from './config'

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

export const ethGasStationCall = async (): Promise<GasInfo> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const url = `https://ethgasstation.info/api/ethgasAPI.json?api-key=${config.ethGasStationApiKey}`
  const result = await fetch(url, options)
  return result.json()
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

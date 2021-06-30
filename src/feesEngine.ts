import { asArray, asNumber, asObject } from 'cleaners'

import { earnCall, EarnInfo } from './partners/earn'
import { ethGasStationCall, GasInfo } from './partners/ethGasStation'
import { BitcoinInfo, mempoolSpaceCall } from './partners/mempoolSpace'
import { config } from './utils/config'
import { earnDataParser, normalizeDate, snooze } from './utils/utils'
const nano = require('nano')
const promisify = require('promisify-node')

const LOOP_TIME_MS = config.timeBetweenCyclesInMinutes * 60 * 1000
const mylog = console.log

const asEthGasStation = asObject({
  fast: asNumber,
  fastest: asNumber,
  safeLow: asNumber,
  average: asNumber
})

const asMempoolSpace = asObject({
  fastestFee: asNumber,
  halfHourFee: asNumber,
  hourFee: asNumber,
  minimumFee: asNumber
})

const asEarn = asArray(
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

const processResponse = (
  resultCleaner: (value: any) => any,
  providerName: string
) => (feesResult: any): any => {
  if (feesResult === null) {
    throw new Error(`Error Fetching from ${providerName}`)
  }
  const prePrepData = feesResult
  const preNormDate = new Date()
  const _id = normalizeDate(preNormDate.toString())
  if (_id === null) {
    throw new Error('Error Normalizing Date: Invalid Date Format')
  }
  const preppedData = {
    _id: _id,
    data: resultCleaner(prePrepData)
  }
  mylog(`${providerName} Data:`, preppedData)
  return preppedData
}
const ethGasStationResponse = processResponse(
  asEthGasStation,
  'Eth Gas Station'
)
const mempoolSpaceResponse = processResponse(asMempoolSpace, 'Mempool.space')
const earnResponse = processResponse(asEarn, 'Earn')

// Nano for CouchDB
// =============================================================================
const nanoDb = nano(config.dbFullpath)
const dbEthGS = nanoDb.db.use('fees_ethgasstation')
const dbEarn = nanoDb.db.use('fees_earn')
const dbMempool = nanoDb.db.use('fees_mempoolspace')
promisify(dbEthGS)
promisify(dbEarn)
promisify(dbMempool)

const feesLoop = async (): Promise<GasInfo | BitcoinInfo | EarnInfo> => {
  while (true) {
    const ethGasStation = ethGasStationCall()
      .then(ethGasStationResponse)
      .then(dbEthGS.insert)
      .catch(e => mylog(e))
    const mempool = mempoolSpaceCall()
      .then(mempoolSpaceResponse)
      .then(dbMempool.insert)
      .catch(e => mylog(e))
    const earn = earnCall()
      .then(jsonObj => {
        return jsonObj.fees
      })
      .then(earnResponse)
      .then(earnDataParser)
      .then(dbEarn.insert)
      .catch(e => mylog(e))
    try {
      await Promise.all([ethGasStation, mempool, earn])
    } catch (error) {
      mylog('Error getting fees:', error)
    }
    await snooze(LOOP_TIME_MS)
  }
}

feesLoop().catch(e => mylog(e))

import { config } from './config'
import {
  etherChainCall,
  ethGasStationCall,
  GasInfo,
  GasInfo2
} from './indexEthFees'
const nano = require('nano')
const promisify = require('promisify-node')

const LOOP_TIME_MS = config.timeBetweenCyclesInSeconds * 1000
const mylog = console.log

// Nano for CouchDB
// =============================================================================
const nanoDb = nano(config.dbFullpath)
const dbAuth = nanoDb.db.use('eth_history')
promisify(dbAuth)

const snooze = async (ms: number): Promise<void> =>
  await new Promise((resolve: Function) => setTimeout(resolve, ms))

const ethFeesLoop = async (): Promise<GasInfo | GasInfo2> => {
  while (true) {
    let prePrepData
    let ans
    try {
      const callAttempt = await ethGasStationCall()
      prePrepData = callAttempt
      ans = {
        fast: prePrepData.fast / 10,
        fastest: prePrepData.fastest / 10,
        safeLow: prePrepData.safeLow / 10,
        average: prePrepData.average / 10,
        source: 'EthGasStation'
      }
      const _id = new Date()
      const logWithId = {
        ...ans,
        _id
      }
      await dbAuth.insert(logWithId)
    } catch (error) {
      mylog('Error getting data from EthGasStation', error)
    }
    if (prePrepData === undefined) {
      try {
        const callAttempt = await etherChainCall()
        prePrepData = callAttempt
        ans = {
          fast: prePrepData.fast,
          fastest: prePrepData.fastest,
          safeLow: prePrepData.safeLow,
          average: prePrepData.standard,
          source: 'EtherChain'
        }
        const _id = new Date()
        const logWithId = {
          ...ans,
          _id
        }
        await dbAuth.insert(logWithId)
      } catch (error) {
        mylog('Error getting data from EtherChain', error)
      }
    }
    if (prePrepData === undefined) {
      throw new Error('Error Checking Eth Fees')
    }
    if (prePrepData !== undefined) {
      mylog(ans)
    }
    await snooze(LOOP_TIME_MS)
  }
}

ethFeesLoop().catch(e => mylog(e))

// indexAuth.js
// BASE SETUP
// =============================================================================

import { asArray, asNumber, asObject } from 'cleaners'
import cluster from 'cluster'
import { forkChildren, rebuildCouch } from 'edge-server-tools'

import { config } from './utils/config'
import { couchSchema } from './utils/couchSchema'
const express = require('express')
const http = require('http')
const nano = require('nano')
const promisify = require('promisify-node')

export const asEthGasStationDBData = asObject({
  fast: asNumber,
  fastest: asNumber,
  safeLow: asNumber,
  average: asNumber
})

const asMempoolSpaceDBData = asObject({
  fastestFee: asNumber,
  halfHourFee: asNumber,
  hourFee: asNumber,
  minimumFee: asNumber
})

// call the packages we need
const app = express()

const mylog = console.log

// Nano for CouchDB
// =============================================================================
const nanoDb = nano(config.dbFullpath)
const ethHistory = nanoDb.db.use('fees_ethgasstation')
const mempoolHistory = nanoDb.db.use('fees_mempoolspace')
const earnHistory = nanoDb.db.use('fees_earn')
promisify(ethHistory)
promisify(mempoolHistory)
promisify(earnHistory)

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router()

router.use(function (req, res, next) {
  mylog('Something is happening.')
  next() // make sure we go to the next routes and don't stop here
})

router.get('/getEthGasStationData/', async function (req, res) {
  const _id = req.query._id
  const _id2 = new Date(_id)
  const _id3 = _id2.toISOString()
  try {
    const doc = await ethHistory.get(_id3)
    const cleanedDoc = asEthGasStationDBData(doc.data)
    res.json(cleanedDoc)
  } catch (e) {
    mylog(e)
    if (e != null && e.error === 'not_found') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      res.status(404).send(`404 error`)
    } else {
      res.status(500).send(`Internal Server Error.`)
    }
  }
})

router.get('/getMempoolSpaceData/', async function (req, res) {
  const _id = req.query._id
  try {
    const doc = await mempoolHistory.get(_id)
    const cleanedDoc = asMempoolSpaceDBData(doc.data)
    res.json(cleanedDoc)
  } catch (e) {
    mylog(e)
    if (e != null && e.error === 'not_found') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      res.status(404).send(`404 error`)
    } else {
      res.status(500).send(`Internal Server Error.`)
    }
  }
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /v1
app.use('/v1', router)

// ---------------------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------------------

async function main(): Promise<void> {
  const { dbFullpath, httpPort, httpHost } = config
  if (cluster.isMaster) {
    await rebuildCouch(dbFullpath, couchSchema).catch(e => console.log(e))
    forkChildren()
  } else {
    // Start the HTTP server:
    const httpServer = http.createServer(app)
    httpServer.listen(httpPort, `${httpHost}`)
    mylog(`Server cluster node listening on port ${httpPort}`)
  }
}

main().catch(e => console.log(e))

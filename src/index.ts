// indexAuth.js
// BASE SETUP
// =============================================================================

import { asArray, asNumber, asObject } from 'cleaners'
import cluster from 'cluster'
import { forkChildren, rebuildCouch } from 'edge-server-tools'

import { config } from './utils/config'
import { couchSchema } from './utils/couchSchema'
import { createDatesArray } from './utils/utils'
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

const asEarnDBData = asArray(
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

router.get('/getEarnData/', async function (req, res) {
  const _id = req.query._id
  try {
    const doc = await earnHistory.get(_id)
    const cleanedDoc = asEarnDBData(doc.data)
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

router.get('/getDataAllPartners/', async function (req, res) {
  const firstDate = new Date(req.query.firstDate)
  const secondDate = new Date(req.query.secondDate)
  const datesArray = createDatesArray(firstDate, secondDate)

  const ethDoc = ethHistory.fetch({ _id: datesArray })
  const mempoolDoc = mempoolHistory.fetch({ _id: datesArray })
  const earnDoc = earnHistory.fetch({ _id: datesArray })
  try {
    const datesDataArray = await Promise.all([ethDoc, mempoolDoc, earnDoc])
    res.json(datesDataArray)
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
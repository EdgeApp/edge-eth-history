// indexAuth.js
// BASE SETUP
// =============================================================================

import cluster from 'cluster'
import { forkChildren, rebuildCouch } from 'edge-server-tools'

import { config } from './utils/config'
import { couchSchema } from './utils/couchSchema'
const express = require('express')
const http = require('http')
const nano = require('nano')
const promisify = require('promisify-node')

// call the packages we need
const app = express()

// Nano for CouchDB
// =============================================================================
const nanoDb = nano(config.dbFullpath)
const ethHistory = nanoDb.db.use('fees_ethgasstation')
const mempoolHistory = nanoDb.db.use('fees_mempoolspace')
const earnHistory = nanoDb.db.use('fees_earn')
promisify(ethHistory)
promisify(mempoolHistory)
promisify(earnHistory)
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
    console.log(`Server cluster node listening on port ${httpPort}`)
  }
}

main().catch(e => console.log(e))

// indexAuth.js
// BASE SETUP
// =============================================================================

import cluster from 'cluster'
import { forkChildren, rebuildCouch } from 'edge-server-tools'

import { config } from './config'
import { couchSchema } from './couchSchema'
const express = require('express')
const http = require('http')
const nano = require('nano')
const promisify = require('promisify-node')

// call the packages we need
const app = express()

// Nano for CouchDB
// =============================================================================
const nanoDb = nano(config.dbFullpath)
const ethHistory = nanoDb.db.use('eth_history')
promisify(ethHistory)

// ---------------------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------------------

async function main(): Promise<void> {
  const { dbFullpath, httpPort } = config
  if (cluster.isMaster) {
    await rebuildCouch(dbFullpath, couchSchema).catch(e => console.log(e))
    forkChildren()
  } else {
    // Start the HTTP server:
    const httpServer = http.createServer(app)
    httpServer.listen(httpPort, '127.0.0.1')
    console.log(`Server cluster node listening on port ${httpPort}`)
  }
}

main().catch(e => console.log(e))

import { makeConfig } from 'cleaner-config'
import { asArray, asNumber, asObject, asOptional, asString } from 'cleaners'

const {
  COUCH_HOSTNAME = '127.0.0.1',
  COUCH_FULL_PATH = 'http://username:password@localhost:5984',
  COUCH_PORT = '8008',
  ETH_GAS_STATION_BASE_URI = 'https://ethgasstation.info',
  ETH_GAS_STATION_API_KEY = '',
  MEMPOOL_SPACE_BASE_URI = 'https://mempool.space',
  MEMPOOL_SPACE_API_KEY = '',
  EARN_BASE_URI = 'https://bitcoinfees.earn.com',
  EARN_API_KEY = '',
  TIME_BETWEEN_CYCLES_IN_MINUTES = '10',
  EARN_FIRST_FEE_START = '0',
  EARN_FIRST_FEE_END = '1',
  EARN_SECOND_FEE_START = '1',
  EARN_SECOND_FEE_END = '2',
  EARN_THIRD_FEE_START = '2',
  EARN_THIRD_FEE_END = '3',
  EARN_THIRD_FEE_MAX_MINUTES = '70',
  EARN_FOURTH_FEE_START = '3',
  EARN_FOURTH_FEE_END = '10'
} = process.env

const asEarnDataSelection = asOptional(
  asObject({
    zeroToOne: asArray(asNumber),
    oneToTwo: asArray(asNumber),
    twoToThree: asArray(asNumber),
    threeToTen: asArray(asNumber)
  }),
  {
    zeroToOne: [parseInt(EARN_FIRST_FEE_START), parseInt(EARN_FIRST_FEE_END)],
    oneToTwo: [parseInt(EARN_SECOND_FEE_START), parseInt(EARN_SECOND_FEE_END)],
    twoToThree: [
      parseInt(EARN_THIRD_FEE_START),
      parseInt(EARN_THIRD_FEE_END),
      parseInt(EARN_THIRD_FEE_MAX_MINUTES)
    ],
    threeToTen: [parseInt(EARN_FOURTH_FEE_START), parseInt(EARN_FOURTH_FEE_END)]
  }
)

export const asConfig = asObject({
  dbFullpath: asOptional(asString, COUCH_FULL_PATH),
  httpHost: asOptional(asString, COUCH_HOSTNAME),
  httpPort: asOptional(asNumber, parseInt(COUCH_PORT)),
  ethGasStationBaseURI: asOptional(asString, ETH_GAS_STATION_BASE_URI),
  ethGasStationApiKey: asOptional(asString, ETH_GAS_STATION_API_KEY),
  mempoolSpaceBaseURI: asOptional(asString, MEMPOOL_SPACE_BASE_URI),
  mempoolSpaceApiKey: asOptional(asString, MEMPOOL_SPACE_API_KEY),
  earnBaseURI: asOptional(asString, EARN_BASE_URI),
  earnApiKey: asOptional(asString, EARN_API_KEY),
  earnDataSelection: asEarnDataSelection,
  timeBetweenCyclesInMinutes: asOptional(
    asNumber,
    parseInt(TIME_BETWEEN_CYCLES_IN_MINUTES)
  )
})

export const config = makeConfig(asConfig, 'serverConfig.json')

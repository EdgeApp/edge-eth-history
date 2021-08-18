import fetch from 'node-fetch'

import { EarnAllInfo, EarnUnsortedData } from '../index'
import { config } from './config'

const mylog = console.log

export const snooze = async (ms: number): Promise<void> =>
  await new Promise((resolve: Function) => setTimeout(resolve, ms))

export function normalizeDate(dateSrc: string): string | null {
  const dateNorm = new Date(dateSrc)
  if (dateNorm.toString() === 'Invalid Date') {
    return null
  }
  // round down to nearest X minutes
  let minutes = dateNorm.getMinutes()
  if (minutes > 0) {
    minutes -= minutes % config.timeBetweenCyclesInMinutes
  }
  dateNorm.setMinutes(minutes)
  dateNorm.setSeconds(0)
  dateNorm.setMilliseconds(0)
  return dateNorm.toISOString()
}

export const apiFetchCall =
  (fetchCleaner: (value: any) => any, url: string, providerName: string) =>
  async (): Promise<any | null> => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
    try {
      const result = await fetch(url, options)
      if (result.ok === false) {
        mylog(`${providerName} returned code ${JSON.stringify(result.status)}`)
      }
      const jsonObj = await result.json()
      fetchCleaner(jsonObj)
      return jsonObj
    } catch (e) {
      mylog('Error is:', e)
      return null
    }
  }

export const createDatesArray = (
  firstDate: Date,
  secondDate: Date,
  intervalMinutes: number = config.timeBetweenCyclesInMinutes
): String[] => {
  if (
    !(firstDate instanceof Date) ||
    !(secondDate instanceof Date) ||
    isNaN(firstDate.getTime()) ||
    isNaN(secondDate.getTime())
  ) {
    console.log('Date format error')
    return []
  }
  const intervalMS = intervalMinutes * 60 * 1000
  const firstDateMS = firstDate.getTime()
  const secondDateMS = secondDate.getTime()
  if (firstDateMS >= secondDateMS) {
    console.log('Date format error')
    return []
  }
  const datesArray: String[] = []
  const datesNumber = (secondDateMS - firstDateMS) / intervalMS
  for (let i = 0; i < datesNumber; i++) {
    const newDate = new Date(firstDateMS + i * intervalMS)
    datesArray.push(newDate.toISOString())
  }
  return datesArray
}

export const earnDataParser = (
  preParsedData: EarnUnsortedData
): EarnAllInfo => {
  const { zeroToOne, oneToTwo, twoToThree, threeToTen } =
    preParsedData.data.reduce<any>((selectedData, feeObject) => {
      for (const dataIndex in config.earnDataSelection) {
        const [min, max, minutes = null] = config.earnDataSelection[dataIndex]
        if (minutes !== null && feeObject.maxMinutes !== minutes) continue
        if (feeObject.minDelay === min && feeObject.maxDelay === max) {
          selectedData[dataIndex] = feeObject.maxFee
        }
      }
      return selectedData
    }, {})
  if (
    zeroToOne === undefined ||
    oneToTwo === undefined ||
    twoToThree === undefined ||
    threeToTen === undefined
  ) {
    throw new Error('Error: Corrupted Data')
  }
  return {
    ...preParsedData,
    sortedData: { zeroToOne, oneToTwo, twoToThree, threeToTen }
  }
}

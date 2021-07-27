import { format, roundToNearestMinutes } from 'date-fns'
import { getTimezoneOffset } from 'date-fns-tz'

import { graphTheme } from '../../theme/graphTheme'

const HOUR_TO_MS_CONVERSION = 60 * 60 * 1000
const TEN_MINUTES = 10

export const createFormattedDate = (
  minutesRound: number,
  modifier: number = 0
): string => {
  return roundToNearestMinutes(new Date(new Date().getTime() - modifier), {
    nearestTo: minutesRound
  }).toISOString()
}

export const adjustDateToSelectedTimezone = (
  dateStr: string,
  timezoneOffset: number
): Date => {
  // Find offset between local timezone and UTC in milliseconds
  const localTimezoneDbName = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localTimezoneOffset = getTimezoneOffset(
    localTimezoneDbName,
    new Date(new Date(dateStr).getTime())
  )
  // Find offset between selected timezone and UTC in milliseconds
  const selectedTimezoneOffset = timezoneOffset * HOUR_TO_MS_CONVERSION
  // Return adjusted date from local timezone to selected timezone
  return new Date(
    new Date(dateStr).getTime() + localTimezoneOffset - selectedTimezoneOffset
  )
}

export const roundedDates = (date: Date, timezoneOffset: number): string => {
  return roundToNearestMinutes(
    new Date(
      adjustDateToSelectedTimezone(date.toJSON(), timezoneOffset).getTime()
    ),
    { nearestTo: TEN_MINUTES }
  ).toISOString()
}

interface Dates {
  start: string
  end: string
}
export const getDates = (path): Dates => {
  const dates = path.split('/').slice(-2)
  const start = dates[0]
  const end = dates[1]
  const datesObj = { start: start, end: end }
  return datesObj
}

export const parseDate = (timestamp: string): string => {
  const dateObj = format(new Date(timestamp), graphTheme.graphDateFormat)
  return dateObj
}

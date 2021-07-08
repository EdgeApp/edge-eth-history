import { format, roundToNearestMinutes } from 'date-fns'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import MainButton from './Buttons'
import { TimezonePicker } from './Inputs'
import Sidetab from './Sidetab'
import Spinner from './Spinner'
import TimePicker from './Timepicker'

const TWENTYFOUR_HOURS_IN_MS = 1000 * 60 * 60 * 24
export interface TimezoneObj {
  value: string
  label: string
  abbrev: string
  offset: number
  altName: string
}

export const divider = {
  marginTop: '15px',
  width: '72%',
  borderTop: '.5px solid white'
}

interface SidebarProps {
  loading: boolean
}

export const initTimezone: TimezoneObj = {
  value: 'GMT',
  label: '(GMT+0:00) UTC',
  abbrev: 'GMT',
  offset: 0,
  altName: 'GMT'
}

export function adjustDateToSelectedTimezone(
  dateStr: string,
  timezoneOffset: number
): Date {
  // Find offset between local timezone and UTC in milliseconds
  const localTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
  // Find offset between selected timezone and UTC in milliseconds
  const selectedTimezoneOffset = timezoneOffset * 60 * 60 * 1000
  // Return adjusted date from local timezone to selected timezone
  return new Date(
    new Date(dateStr).getTime() - localTimezoneOffset - selectedTimezoneOffset
  )
}

export default function Sidebar(props: SidebarProps): JSX.Element {
  const [start, setStart] = useState(
    new Date(new Date().getTime() - TWENTYFOUR_HOURS_IN_MS)
  )
  const [end, setEnd] = useState(new Date())
  const [timezone, setTimezone] = useState(initTimezone)

  const renderSearchButton = (props: SidebarProps): JSX.Element => {
    const history = useHistory()
    if (props.loading) return <Spinner color="white" />
    const parsedStart = format(
      roundToNearestMinutes(
        new Date(
          adjustDateToSelectedTimezone(
            start.toJSON(),
            timezone.offset
          ).getTime()
        ),
        { nearestTo: 10 }
      ),
      "yyyy-MM-dd'T'HH:mm':00.000Z'"
    )
    const parsedEnd = format(
      roundToNearestMinutes(
        new Date(
          adjustDateToSelectedTimezone(end.toJSON(), timezone.offset).getTime()
        ),
        { nearestTo: 10 }
      ),
      "yyyy-MM-dd'T'HH:mm':00.000Z'"
    )
    return (
      <MainButton
        label="Search"
        onClick={() => {
          history.push(`/${parsedStart}/${parsedEnd}`)
        }}
      />
    )
  }
  return (
    <>
      <Sidetab serverName="Eth History">
        <hr style={divider} />
        <TimePicker
          label="Start"
          timePicker
          date={start}
          onChange={start => setStart(start)}
        />
        <TimePicker
          label="End"
          timePicker
          date={end}
          onChange={end => setEnd(end)}
        />
        <TimezonePicker
          currentTimezone={timezone.value}
          onChange={timezone => setTimezone(timezone)}
        />
        <hr style={divider} />
        {renderSearchButton(props)}
      </Sidetab>
    </>
  )
}

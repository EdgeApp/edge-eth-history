import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { strings } from '../../theme/graphString'
import { graphTheme } from '../../theme/graphTheme'
import { roundedDates } from '../clientUtils/clientUtils'
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
  marginTop: graphTheme.dividerMarginTop,
  width: graphTheme.dividerWidth,
  borderTop: graphTheme.dividerBorderTop
}

interface SidebarProps {
  loading: boolean
}

export const initTimezone: TimezoneObj = {
  value: graphTheme.initTimezoneValue,
  label: graphTheme.initTimezoneLabel,
  abbrev: graphTheme.initTimezoneAbbrev,
  offset: graphTheme.initTimezoneOffset,
  altName: graphTheme.initTimezoneAltName
}

export default function Sidebar(props: SidebarProps): JSX.Element {
  const [start, setStart] = useState(
    new Date(new Date().getTime() - TWENTYFOUR_HOURS_IN_MS)
  )
  const [end, setEnd] = useState(new Date())
  const [timezone, setTimezone] = useState(initTimezone)

  const renderSearchButton = (props: SidebarProps): JSX.Element => {
    const history = useHistory()
    if (props.loading) return <Spinner color={graphTheme.spinnerColor} />
    const parsedStart = roundedDates(start, timezone.offset)
    const parsedEnd = roundedDates(end, timezone.offset)
    return (
      <MainButton
        label={strings.mainButtonLabel}
        onClick={() => {
          history.push(`/${parsedStart}/${parsedEnd}`)
        }}
      />
    )
  }

  return (
    <>
      <Sidetab serverName={strings.sidetabServerName}>
        <hr style={divider} />
        <TimePicker
          label={strings.timepickerStartLabel}
          timePicker
          date={start}
          onChange={start => setStart(start)}
        />
        <TimePicker
          label={strings.timepickerEndLabel}
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

import 'react-datepicker/dist/react-datepicker.css'

import React from 'react'
import DatePicker from 'react-datepicker'

import { graphTheme } from '../../theme/graphTheme'

const dateContainer = {
  marginLeft: graphTheme.dateContainerMarginLeft
}

const calendarText = {
  marginTop: graphTheme.calenderTextMarginTop,
  fontSize: graphTheme.calenderTextFontSize,
  color: graphTheme.calenderTextColor
}

const dateInput = {
  marginLeft: graphTheme.dateInputMarginLeft,
  fontSize: graphTheme.dateInputFontSize,
  backgroundColor: graphTheme.dateInputBackgroundColor as 'transparent',
  border: graphTheme.dateInputBorder,
  color: graphTheme.dateInputColor,
  width: graphTheme.dateInputWidth
}

interface TimePickerProps {
  label: string
  timePicker: boolean
  date: Date
  onChange: (e: Date) => void
}

export default function TimePicker(props: TimePickerProps): JSX.Element {
  const { date, onChange, label, timePicker } = props
  return (
    <div style={dateContainer}>
      <div style={calendarText}>{label}</div>
      <DatePicker
        customInput={<input style={dateInput} />}
        showTimeSelect={timePicker}
        selected={date}
        onChange={e => onChange(e)}
        dateFormat={graphTheme.datePickerDateFormat}
      />
    </div>
  )
}

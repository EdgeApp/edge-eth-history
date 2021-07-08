import React, { useState } from 'react'
import TimezoneSelect from 'react-timezone-select'

import { graphTheme } from '../../theme/graphTheme'
import { TimezoneObj } from './Sidebar'

const containers = {
  small: {
    marginLeft: graphTheme.inputsContainerSmallMarginLeft,
    marginTop: graphTheme.inputsContainerSmallMarginTop,
    display: graphTheme.inputsContainerSmallDisplay,
    flexDirection: graphTheme.inputsContainerSmallFlexDirection as 'column'
  }
}

export const inputLabel = {
  fontSize: graphTheme.inputsInputLabelFontSize,
  color: graphTheme.inputsInputLabelColor
}

export const TimezonePicker = (props: any): JSX.Element => {
  // Declare a new state variable 'selectedTimezone' and set it initially to the timezone passed in as props
  // 'setSelectedTimezone' is a function to update 'selectedTimezone'
  const [selectedTimezone, setSelectedTimezone] = useState(
    props.currentTimezone
  )

  // Method to update the timezone information in the component, and in the parent
  const changeTimezone = (timezone: TimezoneObj): void => {
    setSelectedTimezone(timezone) // Update 'selectedTimezone' to be the new timezone
    props.onChange(timezone) // Update state in parent component with new timezone
  }

  return (
    <>
      <div style={{ ...containers.small, width: graphTheme.inputsDivWidth }}>
        <div style={inputLabel}>Timezone</div>
        <TimezoneSelect value={selectedTimezone} onChange={changeTimezone} />
      </div>
    </>
  )
}

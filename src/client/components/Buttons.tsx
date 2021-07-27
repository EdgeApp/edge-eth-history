import React from 'react'

import { graphTheme } from '../../theme/graphTheme'

const button = {
  outline: graphTheme.buttonOutline,
  backgroundColor: graphTheme.buttonBackgroundColor as 'transparent',
  fontSize: graphTheme.buttonFontSize,
  cursor: graphTheme.buttonCursor as 'pointer'
}

const mainButton = {
  ...button,
  overflow: graphTheme.mainButtonOverflow as 'hidden',
  marginTop: graphTheme.mainButtonMarginTop,
  marginLeft: graphTheme.mainButtonMarginLeft,
  marginBottom: graphTheme.mainButtonMarginBottom,
  color: graphTheme.mainButtonColor,
  border: graphTheme.mainButtonBorder
}

interface buttonProps {
  label: string
  onClick: () => void
}

export default function MainButton(props: buttonProps): JSX.Element {
  return (
    <button style={mainButton} onClick={props.onClick}>
      {props.label}
    </button>
  )
}

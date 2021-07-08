import React from 'react'

const button = {
  outline: 'none',
  backgroundColor: 'transparent' as 'transparent',
  fontSize: '16px',
  cursor: 'pointer' as 'pointer'
}

const mainButton = {
  ...button,
  overflow: 'hidden' as 'hidden',
  marginTop: '12px',
  marginLeft: '68px',
  marginBottom: '12px',
  color: 'white',
  border: '1px solid white'
}

interface buttonProps {
  label: string
  onClick: () => void
}

export default function MainButton(props: buttonProps): JSX.Element {
  return (
    <button style={mainButton} onClick={() => props.onClick()}>
      {props.label}
    </button>
  )
}

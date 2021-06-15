import './App.css'

import React, { Component } from 'react'

export const body = {
  margin: 0,
  padding: 0,
  height: '100%'
}

export const row = {
  width: '100%',
  height: '100%',
  display: 'table' as 'table',
  tableLayout: 'fixed' as 'fixed'
}

class App extends Component {
  render(): JSX.Element {
    return <div style={row} />
  }
}

export default App

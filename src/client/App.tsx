import './App.css'

import React, { useEffect } from 'react'

import GraphScene from './components/GraphScene'
import Sidebar from './components/Sidebar'

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

export default function App(): JSX.Element {
  useEffect(() => {
    Object.assign(document.body.style, body)
  }, [])
  return (
    <>
      <div style={row}>
        <Sidebar />
        <GraphScene />
      </div>
    </>
  )
}

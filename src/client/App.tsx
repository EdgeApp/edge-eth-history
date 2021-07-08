import 'regenerator-runtime/runtime'
import './App.css'

import React, { useEffect, useState } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import { graphTheme } from '../theme/graphTheme.js'
import { createFormattedDate } from './clientUtils/clientUtils'
import GraphScene from './components/GraphScene'
import Sidebar from './components/Sidebar'

const TWENTYFOUR_HOURS_IN_MS = 1000 * 60 * 60 * 24

// ***NOT A PERMANENT FIX***
export const CYCLE_TIME = 10
// ***NOT A PERMANENT FIX***

export const body = {
  margin: graphTheme.appMargin,
  padding: graphTheme.appPadding,
  height: graphTheme.appHeight
}

export const row = {
  width: graphTheme.rowWidth,
  height: graphTheme.rowHeight,
  display: graphTheme.rowDisplay as 'table',
  tableLayout: graphTheme.rowTableLayout as 'fixed'
}

export default function App(): JSX.Element {
  const [start] = useState(
    createFormattedDate(CYCLE_TIME, TWENTYFOUR_HOURS_IN_MS)
  )
  const [end] = useState(createFormattedDate(CYCLE_TIME))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Object.assign(document.body.style, body)
  }, [])

  return (
    <HashRouter>
      <div style={row}>
        <Sidebar loading={loading} />
        <Switch>
          <Route exact path="/">
            <Redirect to={`/${start}/${end}`} />
          </Route>
          <Route
            path="/:start?/:end?"
            // eslint-disable-next-line react/no-children-prop
            children={<GraphScene setLoading={setLoading} />}
          />
        </Switch>
      </div>
    </HashRouter>
  )
}

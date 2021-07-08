import 'regenerator-runtime/runtime'
import './App.css'

import { format, roundToNearestMinutes } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import GraphScene from './components/GraphScene'
import Sidebar from './components/Sidebar'

const TWENTYFOUR_HOURS_IN_MS = 1000 * 60 * 60 * 24

// ***NOT A PERMANENT FIX***
const CYCLE_TIME = 10
// ***NOT A PERMANENT FIX***

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

export const createFormattedDate = (
  minutesRound: number,
  modifier: number = 0
): string => {
  return format(
    roundToNearestMinutes(new Date(new Date().getTime() - modifier), {
      nearestTo: minutesRound
    }),
    "yyyy-MM-dd'T'HH:mm':00.000Z'"
  )
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

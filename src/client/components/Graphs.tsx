import React, { Component } from 'react'

interface GraphsState {
  data: any[]
}

const parseDate = (timestamp: string): string => {
  const dateObj = new Date(timestamp)
  const y = dateObj.getUTCFullYear()
  const m = dateObj.getUTCMonth() + 1
  const d = dateObj.getUTCDate()
  const h = dateObj.getUTCHours()
  const min = dateObj.getUTCMinutes()
  return `${y}-${m}-${d}T${h}:${min}`
}

class Graphs extends Component<{}, GraphsState> {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render(): JSX.Element {
    return <></>
  }
}

export default Graphs

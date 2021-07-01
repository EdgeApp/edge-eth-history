import React, { Component } from 'react'

interface GraphsState {
  data: any[]
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

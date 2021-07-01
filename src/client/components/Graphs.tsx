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

export const dataParser = (rawData: any, provider: string): any => {
  let parsedData: any[] = []
  const shortDateData: any[] = []
  const datesNumber = rawData.length / 3
  switch (provider) {
    case 'Eth Gas Station':
      parsedData = rawData.slice(0, datesNumber)
      parsedData.forEach(object => {
        const _id = parseDate(object._id)
        const newObject = { ...object, _id }
        shortDateData.push(newObject)
      })
      break
    case 'Mempool.space':
      parsedData = rawData.slice(datesNumber, datesNumber * 2)
      parsedData.forEach(object => {
        const _id = parseDate(object._id)
        const newObject = { ...object, _id }
        shortDateData.push(newObject)
      })
      break
    case 'Earn':
      parsedData = rawData.slice(datesNumber * 2, datesNumber * 3)
      parsedData.forEach(object => {
        const _id = parseDate(object._id)
        const newObject = { ...object, _id }
        shortDateData.push(newObject)
      })
      break
  }
  return shortDateData
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

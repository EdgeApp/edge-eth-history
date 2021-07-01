import React, { Component } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
interface GraphsState {
  data: any[]
}

const graphHolder = {
  height: '90%'
}

const graphTitle = {
  marginLeft: '7rem'
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
    return (
      <>
        <div style={graphHolder}>
          <h1 style={graphTitle}>Eth Gas Station</h1>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart
              margin={{
                top: 20,
                right: 20,
                bottom: 0,
                left: 20
              }}
              data={dataParser(this.state.data, 'Eth Gas Station')}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="_id" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#000000"
                width={105}
                label={{
                  value: 'Gwei x 10',
                  angle: -90,
                  position: 'center'
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.fastest"
                stroke="#0b84a5"
                name="Fastest"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.fast"
                stroke="#f6c860"
                name="Fast"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.average"
                stroke="#ca472f"
                name="Average"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.safeLow"
                stroke="#9dd865"
                name="Safe Low"
              />
            </LineChart>
          </ResponsiveContainer>
          <h1 style={graphTitle}>Mempool.space</h1>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart
              margin={{
                top: 20,
                right: 20,
                bottom: 0,
                left: 20
              }}
              data={dataParser(this.state.data, 'Mempool.space')}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="_id" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#000000"
                width={105}
                label={{
                  value: 'satoshis/vbyte',
                  angle: -90,
                  position: 'center'
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.fastestFee"
                stroke="#0b84a5"
                name="Fastest Fee"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.halfHourFee"
                stroke="#f6c860"
                name="Half Hour Fee"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.hourFee"
                stroke="#ca472f"
                name="Hour Fee"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.minimumFee"
                stroke="#9dd865"
                name="Minimum Fee"
              />
            </LineChart>
          </ResponsiveContainer>
          <h1 style={graphTitle}>Earn</h1>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart
              margin={{
                top: 20,
                right: 20,
                bottom: 0,
                left: 20
              }}
              data={dataParser(this.state.data, 'Earn')}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="_id" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#000000"
                width={105}
                label={{
                  value: 'satoshis/byte',
                  angle: -90,
                  position: 'center'
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.sortedData.zeroToOne"
                stroke="#0b84a5"
                name="0-1"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.sortedData.oneToTwo"
                stroke="#f6c860"
                name="1-2"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.sortedData.twoToThree"
                stroke="#ca472f"
                name="2-3"
              />
              <Line
                dot={false}
                legendType="square"
                yAxisId="left"
                dataKey="data.sortedData.threeToTen"
                stroke="#9dd865"
                name="3-10"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    )
  }
}

export default Graphs

import React from 'react'
import {
  CartesianGrid,
  Legend,
  LegendType,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { graphTheme } from '../../theme/graphTheme.js'

const graphTitle = {
  marginLeft: graphTheme.graphMarginLeft
}

const graphStyle = {
  width: graphTheme.graphWidth,
  height: graphTheme.graphHeight
}
const graphProps = {
  lineChartMargin: {
    top: graphTheme.lineChartMarginTop,
    right: graphTheme.lineChartMarginRight,
    bottom: graphTheme.lineChartMarginBottom,
    left: graphTheme.lineChartMarginLeft
  },
  cartesianGridStroke: graphTheme.graphGridColor,
  yAxis: {
    yAxisId: graphTheme.yAxisId,
    orientation: graphTheme.yAxisOrientation as 'left' | 'right',
    stroke: graphTheme.graphYAxisColor,
    width: graphTheme.yAxisWidth
  }
}

const yAxisLabel = {
  angle: graphTheme.yAxisLabelAngle,
  position: graphTheme.yAxisLabelPosition
}

const graphLineProps = {
  dot: graphTheme.graphLineDot,
  legendType: graphTheme.graphLineLegendType as LegendType,
  yAxisId: graphTheme.graphLineYAxisId
}

interface lineData {
  lineDataKey: string
  color: string
  name: string
}
interface GraphProps {
  title: string
  data: any[]
  xDataKey: string
  labelValue: string
  lineData: lineData[]
}

const lineMap = (array: lineData[]): JSX.Element[] => {
  return array.map((element, index) => {
    return (
      <Line
        key={index}
        {...graphLineProps}
        dataKey={element.lineDataKey}
        stroke={element.color}
        name={element.name}
      />
    )
  })
}

export default function Graph(props: GraphProps): JSX.Element {
  return (
    <>
      <h1 style={graphTitle}>{props.title}</h1>
      <ResponsiveContainer {...graphStyle}>
        <LineChart margin={graphProps.lineChartMargin} data={props.data}>
          <CartesianGrid stroke={graphProps.cartesianGridStroke} />
          <XAxis dataKey={props.xDataKey} />
          <YAxis
            {...graphProps.yAxis}
            label={{
              value: props.labelValue,
              ...yAxisLabel
            }}
          />
          <Tooltip />
          <Legend />
          {lineMap(props.lineData)}
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

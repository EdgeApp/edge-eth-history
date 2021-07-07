import { format } from 'date-fns'
import React, { useState } from 'react'

import { strings } from '../../theme/graphString'
import { graphTheme } from '../../theme/graphTheme'
import Graph from './Graph'

const graphHolder = {
  height: '90%'
}

const ethGraphProps = {
  title: strings.eth_graph_title,
  xDataKey: strings.x_axis_data_key,
  labelValue: strings.eth_data_label,
  lineData: [
    {
      lineDataKey: strings.eth_fastest_data_key,
      color: graphTheme.ethFastestGraphLine,
      name: strings.eth_fastest_data_name
    },
    {
      lineDataKey: strings.eth_fast_data_key,
      color: graphTheme.ethFastGraphLine,
      name: strings.eth_fast_data_name
    },
    {
      lineDataKey: strings.eth_average_data_key,
      color: graphTheme.ethAverageGraphLine,
      name: strings.eth_average_data_name
    },
    {
      lineDataKey: strings.eth_safelow_data_key,
      color: graphTheme.ethSafeLowGraphLine,
      name: strings.eth_safelow_data_name
    }
  ]
}

const mempoolGraphProps = {
  title: strings.mempool_graph_title,
  xDataKey: strings.x_axis_data_key,
  labelValue: strings.mempool_data_label,
  lineData: [
    {
      lineDataKey: strings.mempool_fastest_data_key,
      color: graphTheme.mempoolFastestFeeGraphLine,
      name: strings.mempool_fastest_data_name
    },
    {
      lineDataKey: strings.mempool_half_hour_data_key,
      color: graphTheme.mempoolHalfHourFeeGraphLine,
      name: strings.mempool_half_hour_data_name
    },
    {
      lineDataKey: strings.mempool_hour_data_key,
      color: graphTheme.mempoolHourFeeGraphLine,
      name: strings.mempool_hour_data_name
    },
    {
      lineDataKey: strings.mempool_minimum_data_key,
      color: graphTheme.mempoolMinimumFeeGraphLine,
      name: strings.mempool_minimum_data_name
    }
  ]
}

const earnGraphProps = {
  title: strings.earn_graph_title,
  xDataKey: strings.x_axis_data_key,
  labelValue: strings.earn_data_label,
  lineData: [
    {
      lineDataKey: strings.earn_zero_to_one_data_key,
      color: graphTheme.earnZeroToOneGraphLine,
      name: strings.earn_zero_to_one_data_name
    },
    {
      lineDataKey: strings.earn_one_to_two_data_key,
      color: graphTheme.earnOneToTwoGraphLine,
      name: strings.earn_one_to_two_data_name
    },
    {
      lineDataKey: strings.earn_two_to_three_data_key,
      color: graphTheme.earnTwoToThreeGraphLine,
      name: strings.earn_two_to_three_data_name
    },
    {
      lineDataKey: strings.earn_three_to_ten_data_key,
      color: graphTheme.earnThreeToTenGraphLine,
      name: strings.earn_three_to_ten_data_name
    }
  ]
}

const parseDate = (timestamp: string): string => {
  const dateObj = format(new Date(timestamp), "yyyy-MM-dd'T'HH:mm")
  return dateObj
}

export const dataParser = (array, index): any => {
  let parsedData: any[] = []
  const shortDateData: any[] = []
  if (array[index] === undefined) return
  parsedData = array[index].rows
  parsedData.forEach(object => {
    if (object.error === 'not_found') return
    const _id = parseDate(object.doc._id)
    const newObject = { ...object.doc, _id }
    shortDateData.push(newObject)
  })
  return shortDateData
}

export const dataSelecter = (rawData: any, provider: string): any => {
  const ethDataIndex = 0
  const mempoolDataIndex = 1
  const earnDataIndex = 2
  switch (provider) {
    case 'Eth Gas Station':
      return dataParser(rawData, ethDataIndex)
    case 'Mempool.space':
      return dataParser(rawData, mempoolDataIndex)
    case 'Earn':
      return dataParser(rawData, earnDataIndex)
  }
}

export default function GraphScene(): JSX.Element {
  const [data] = useState([])

  return (
    <>
      <div style={graphHolder}>
        <Graph
          {...ethGraphProps}
          data={dataSelecter(data, 'Eth Gas Station')}
        />
        <Graph
          {...mempoolGraphProps}
          data={dataSelecter(data, 'Mempool.space')}
        />
        <Graph {...earnGraphProps} data={dataSelecter(data, 'Earn')} />
      </div>
    </>
  )
}

const palette = {
  blue: '#0B84A5',
  yellow: '#f6C860',
  red: '#CA472F',
  green: '#9DD865',
  white: '#F5F5F5',
  black: '#000000'
}

export const graphTheme = {
  ethFastestGraphLine: palette.blue,
  ethFastGraphLine: palette.yellow,
  ethAverageGraphLine: palette.red,
  ethSafeLowGraphLine: palette.green,
  mempoolFastestFeeGraphLine: palette.blue,
  mempoolHalfHourFeeGraphLine: palette.yellow,
  mempoolHourFeeGraphLine: palette.red,
  mempoolMinimumFeeGraphLine: palette.green,
  earnZeroToOneGraphLine: palette.blue,
  earnOneToTwoGraphLine: palette.yellow,
  earnTwoToThreeGraphLine: palette.red,
  earnThreeToTenGraphLine: palette.green,

  graphGridColor: palette.white,
  graphYAxisColor: palette.black,

  graphMarginLeft: '7rem',
  graphWidth: '95%',
  graphHeight: 400,

  lineChartMarginTop: 20,
  lineChartMarginRight: 20,
  lineChartMarginBottom: 0,
  lineChartMarginLeft: 20,

  yAxisId: 'left',
  yAxisOrientation: 'left',
  yAxisWidth: 105,

  yAxisLabelAngle: -90,
  yAxisLabelPosition: 'center',

  graphLineDot: false,
  graphLineLegendType: 'square',
  graphLineYAxisId: 'left'
}

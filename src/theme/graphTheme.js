const palette = {
  blue: '#0B84A5',
  yellow: '#f6C860',
  red: '#CA472F',
  green: '#9DD865',
  whiteSmoke: '#F5F5F5',
  black: '#000000',
  white: '#FFFFFF'
}

export const graphTheme = {
  // App
  appMargin: 0,
  appPadding: 0,
  appHeight: '100%',
  rowWidth: '100%',
  rowHeight: '100%',
  rowDisplay: 'table',
  rowTableLayout: 'fixed',

  // Graphs
  graphHolderHeight: '90%',

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

  graphGridColor: palette.whiteSmoke,
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
  graphLineYAxisId: 'left',

  graphDateFormat: "yyyy-MM-dd'T'HH:mm",

  // Buttons
  buttonOutline: 'none',
  buttonBackgroundColor: 'transparent',
  buttonFontSize: '16px',
  buttonCursor: 'pointer',

  mainButtonOverflow: 'hidden',
  mainButtonMarginTop: '12px',
  mainButtonMarginLeft: '68px',
  mainButtonMarginBottom: '12px',
  mainButtonColor: palette.white,
  mainButtonBorder: '1px solid white',

  // Timepicker
  dateContainerMarginLeft: '26px',

  calenderTextMarginTop: '20px',
  calenderTextFontSize: '16px',
  calenderTextColor: palette.white,

  dateInputMarginLeft: '-2px',
  dateInputFontSize: '14px',
  dateInputBackgroundColor: 'transparent',
  dateInputBorder: 'none',
  dateInputColor: palette.white,
  dateInputWidth: '148px',

  datePickerDateFormat: 'MMM d, yyyy h:mm aa',

  // Sidebar
  dividerMarginTop: '15px',
  dividerWidth: '72%',
  dividerBorderTop: '.5px solid white',

  initTimezoneValue: 'GMT',
  initTimezoneLabel: '(GMT+0:00) UTC',
  initTimezoneAbbrev: 'GMT',
  initTimezoneOffset: 0,
  initTimezoneAltName: 'GMT',

  spinnerColor: palette.white,

  // Spinner
  spinnerLoaderTextAlign: 'center',
  spinnerLoaderMarginTop: '29px',

  spinnerLoaderType: 'Oval',
  spinnerLoaderHeight: '30px',
  spinnerLoaderWidth: '30px',

  // Sidetab
  logoStyleMarginTop: '26px',
  logoStyleMarginLeft: '26px',
  logoStyleMarginBottom: '10px',
  logoStyleHeight: '28px',
  logoStyleWidth: '28px',

  titleTextMarginLeft: '26px',
  titleTextColor: palette.white,
  titleTextFontSize: '24px',

  sidetabSidebarDisplay: 'table-cell',
  sidetabSidebarBackground: 'linear-gradient(90deg, #0C446A 0%, #0D2145 100%)',
  sidetabSidebarWidth: '200px',

  // Inputs
  inputsContainerSmallMarginLeft: '26px',
  inputsContainerSmallMarginTop: '16px',
  inputsContainerSmallDisplay: 'flex',
  inputsContainerSmallFlexDirection: 'column',

  inputsInputLabelFontSize: '16px',
  inputsInputLabelColor: palette.white,

  inputsDivWidth: '148px'
}

import React from 'react'
import Loader from 'react-loader-spinner'

import { graphTheme } from '../../theme/graphTheme'

const loader = {
  textAlign: graphTheme.spinnerLoaderTextAlign as 'center',
  marginTop: graphTheme.spinnerLoaderMarginTop
}

interface SpinnerProps {
  color: string
}

export default function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <div style={loader}>
      <Loader
        type={graphTheme.spinnerLoaderType}
        color={props.color}
        height={graphTheme.spinnerLoaderHeight}
        width={graphTheme.spinnnerLoaderWidth}
      />
    </div>
  )
}

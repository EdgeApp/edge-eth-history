import React from 'react'

import { strings } from '../../theme/graphString'
import { graphTheme } from '../../theme/graphTheme'
// @ts-expect-error
import logo from '../images/logo.png'

interface SidetabProps {
  serverName: string
  children: React.ReactNode
}

const logoStyle = {
  marginTop: graphTheme.logoStyleMarginTop,
  marginLeft: graphTheme.logoStyleMarginLeft,
  marginBottom: graphTheme.logoStyleMarginBottom,
  height: graphTheme.logoStyleHeight,
  width: graphTheme.logoStyleWidth
}

const titleText = {
  marginLeft: graphTheme.titleTextMarginLeft,
  color: graphTheme.titleTextColor,
  fontSize: graphTheme.titleTextFontSize
}

const sidebar = {
  display: graphTheme.sidetabSidebarDisplay as 'table-cell',
  background: graphTheme.sidetabSidebarBackground,
  width: graphTheme.sidetabSidebarWidth
}

export default function Sidetab(props: SidetabProps): JSX.Element {
  return (
    <div style={sidebar}>
      <img style={logoStyle} src={logo} alt={strings.sidetabLogoAltText} />
      <div style={titleText}>Edge</div>
      <div style={titleText}>{props.serverName}</div>
      {props.children}
    </div>
  )
}

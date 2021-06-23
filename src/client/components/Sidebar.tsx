import React, { PureComponent } from 'react'

import Sidetab from './Sidetab'

class Sidebar extends PureComponent<any> {
  render(): JSX.Element {
    return <Sidetab serverName="Eth History" />
  }
}
export default Sidebar

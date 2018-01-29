import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'

const MOUNT_NODE = document.getElementById('root')

const render = (Component: React.SFC<{}>) => {
  ReactDOM.render(<Component />, MOUNT_NODE)
}

render(App)

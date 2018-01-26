import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const MOUNT_NODE = document.getElementById('root')

const render = (Component: React.SFC<any>) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    MOUNT_NODE
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}

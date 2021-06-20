import React from 'react'
import ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

// redux-store using hooks-api from react-redux

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)


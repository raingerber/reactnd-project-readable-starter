import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import reducer from './reducers/index'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

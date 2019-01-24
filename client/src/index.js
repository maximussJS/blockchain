import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

ReactDOM.render(
  <Router>
      <Route path='/' component={App}/>
  </Router>,
  document.getElementById('root')
)

serviceWorker.unregister()
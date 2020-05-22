import React from 'react';
import {withPageView} from './withPageView'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { HOME_PATH } from './routes'
import logo from './logo.svg';
import './App.scss';

import Home from './routes/Home'


class App extends React.Component {

  render = () => {
    const isComingSoon = false;
    if(isComingSoon) {
      return this.renderComingSoon()
    } else {
      return this.routes()
    }
  }
  
  routes = () => {
    return (
      <Router>
        <Switch>
          <Route exact path={HOME_PATH} component={withPageView(Home)} />
        </Switch>
      </Router>
    )
  }
  
  renderComingSoon = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Yuk Bantu Bisnis Online - Coming Soon!
          </p>
        </header>
      </div>
    )
  }
}

export default App
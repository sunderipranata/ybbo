import React from 'react';
import ReactGA from "react-ga";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { HOME_PATH, BUSINESS_DETAIL_PATH, ABOUT_PATH } from './routes'
import logo from './logo.svg'
import './App.scss'

import Home from './routes/Home'
import BusinessDetail from './routes/BusinessDetail'
import About from './routes/About/About'
import withPageView from './utils/googleAnalytics/withPageView'

require('dotenv').config();

ReactGA.initialize("UA-78912543-2", {
  testMode: process.env.NODE_ENV === "test",
  debug: process.env.NODE_ENV !== "production",
});

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
          <Route exact path={BUSINESS_DETAIL_PATH} component={BusinessDetail} />
          <Route exact path={ABOUT_PATH} component={About} />
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
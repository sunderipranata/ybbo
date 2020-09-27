import React from 'react';
import ReactGA from "react-ga";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { HOME_PATH, BUSINESS_DETAIL_PATH, BUSINESS_LIST_PATH, ABOUT_PATH, INTERNAL_COOKIE_PATH, SITEMAP_PATH, SITEMAP_PAGE_PATH } from './routes'
import logo from './logo.svg'
import './App.scss'

import Home from './routes/Home'
import InternalPage from './routes/InternalPage'
import BusinessDetail from './routes/BusinessDetail'
import BusinessList from './routes/BusinessList'
import About from './routes/About/About'
import withPageView from './utils/googleAnalytics/withPageView'
import Cookies from 'universal-cookie';
import Sitemap from './routes/Sitemap'

require('dotenv').config();

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_TRACK_ID  , {
  testMode: process.env.NODE_ENV === "test",
  debug: process.env.NODE_ENV !== "production"
});

ReactGA.set({
  dimension1: new Cookies().get("internalTraffic",{doNotParse:true})
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
          {/* <Route exact path={HOME_PAGINATED_PATH} component={withPageView(Home)} /> */}
          <Route exact path={BUSINESS_DETAIL_PATH} component={withPageView(BusinessDetail)} />
          <Route exact path={BUSINESS_LIST_PATH} component={withPageView(BusinessList)} />
          <Route exact path={ABOUT_PATH} component={withPageView(About)} />
          <Route exact path={INTERNAL_COOKIE_PATH} component={withPageView(InternalPage)} />
          <Route exact path={SITEMAP_PAGE_PATH} component={withPageView(Sitemap)} />
          <Route exact path={SITEMAP_PATH} component={withPageView(Sitemap)} />
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
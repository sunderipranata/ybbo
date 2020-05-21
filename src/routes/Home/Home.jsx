import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../components/Header'

import './Home.scss'
import Hero from './components/Hero'
import Steps from './components/Steps'
import BusinessList from './components/BusinessList'
import Footer from '../../components/Footer'

import BusinessService from '../../services/BusinessService'

class Home extends React.Component {

  componentDidMount = () => {
    const limit = 3
    
    BusinessService.getSimplifiedWithLimitOffset(limit, null, (res) => {
      console.log('home responsee', res)
    })
  }

  render = () => {
    return (
      <Fragment>
        <Header />
        <main className="container__home">
          <Hero />
          <Steps />
          <BusinessList />
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(Home)

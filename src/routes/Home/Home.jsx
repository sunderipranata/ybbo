import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../components/Header'

import './Home.scss'
import Hero from './components/Hero'
import Steps from './components/Steps'
import BusinessList from './components/BusinessList'
import Footer from '../../components/Footer'
import { isMobile } from 'react-device-detect'

import BusinessService from '../../services/BusinessService'

const PAGE_SIZE_DESKTOP = 6;
const PAGE_SIZE_MOBILE = 3;

class Home extends React.Component {
  state = {
    businessData: {
      businesses: [],
      total: 1
    }
  }

  componentDidMount = () => {
    const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    
    BusinessService.getSimplifiedWithLimitOffset(limit, null, (res) => {
      console.log('home responsee', res)
      if(res !== null && res.data.meta.http_status === 200) {
        this.parseBusinessResponse(res.data)
      }

      //TODO: error handling
    })
  }

  parseBusinessResponse = (data) => {
    const total = data.meta.total
    const businesses = data.data.map((val, idx) => {
      return {
        id: val.id,
        category: val.attributes.category,
        location: val.attributes.location,
        thumbnailUrl: val.attributes.thumbnail_url,
        backersCount: val.attributes.backers_count
      }
    })

    this.setState({
      businessData: {
         businesses: businesses,
         total: total
      }
    })
  }

  render = () => {
    const { businessData, device } = this.state
    return (
      <Fragment>
        <Header />
        <main className="container__home">
          <Hero />
          <Steps />
          <BusinessList 
            businessData = { businessData }
            device = { device }
          />
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(Home)

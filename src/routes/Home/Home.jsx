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

  fetchSimplifiedBusiness = (limit, offset, category, callback) => {
    BusinessService.getSimplifiedWithLimitOffset(limit, offset, category, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        callback(this.parseBusinessResponse(res.data))
      }

      callback(null)
    })
  }

  parseBusinessResponse = (data) => {
    const total = data.meta.total
    const businesses = data.data.map((val, idx) => {
      return {
        id: val.id,
        name: val.attributes.name,
        category: val.attributes.category,
        location: val.attributes.location,
        thumbnailUrl: val.attributes.thumbnail_url,
        backersCount: val.attributes.backers_count
      }
    })

    return {
      businesses: businesses,
      total: total
    }
  }

  render = () => {
    return (
      <Fragment>
        <Header />
        <main className="container__home">
          <Hero />
          <Steps />
          <BusinessList 
            fetchData = { this.fetchSimplifiedBusiness }
          />
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(Home)

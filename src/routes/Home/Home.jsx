import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../components/Header'
import { Helmet } from 'react-helmet'

import './Home.scss'
import Hero from './components/Hero'
import Steps from './components/Steps'
import Footer from '../../components/Footer'

import BusinessService from '../../services/BusinessService'
import PageLabel from '../../utils/googleAnalytics/PageLabel'

import BusinessFeatured from './components/BusinessFeatured'

const PAGE_SIZE_DESKTOP = 9;

class Home extends React.Component {

  state = {
    businessData: {
      businesses: []
    },
    isLoading: true,
    pageSize: PAGE_SIZE_DESKTOP
  }

  componentDidMount = () => {
    this.handleFetchData()
    window.scrollTo({top: 0})
  }

  handleFetchData = () => {
    this.setState({
      isLoading: true,
    })

    this.fetchFeatured((res) => {
      if(res != null) {
        this.setState({
          businessData: res,
          isLoading: false
        })
      }
    })
  }

  fetchFeatured = (callback) => {
    BusinessService.getFeatured((res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        callback(this.parseBusinessResponse(res.data))
      } else {
        callback(null)
      }
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
        backersCount: val.attributes.backers_count,
        slug: val.attributes.slug
      }
    })

    return {
      businesses: businesses,
      total: total
    }
  }

  renderHelmet = () => {
    return (
      <Helmet>
        <title>Yuk Bantu Bisnis Online!</title>
        <meta name = "title" content = "Yuk Bantu Bisnis Online!"/>
        <meta name = "description" 
          content = "Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yukbantubisnisonline.com/" />
        <meta property="og:title" content="Yuk Bantu Bisnis Online" />
        <meta property="og:description" content="Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia." />
        <meta property="og:image" content="https://i.ibb.co/1Lp3TXp/og-ybbo.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yukbantubisnisonline.com/" />
        <meta property="twitter:title" content="Yuk Bantu Bisnis Online" />
        <meta property="twitter:description" content="Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia." />
        <meta property="twitter:image" content="https://i.ibb.co/1Lp3TXp/og-ybbo.jpgg" />
      </Helmet>
    )
  }

  render = () => {
    const { businessData, isLoading, pageSize } = this.state
    return (
      <Fragment>
        { this.renderHelmet() }
        <article>
          <Header pageLabel={PageLabel.HEADER}/>
            <main className="container__home">
              <Hero />
              <Steps />
              <BusinessFeatured 
                isLoading = { isLoading }
                pageSize = { pageSize }
                businessData = { businessData }
              />
            </main>
          <Footer pageLabel={PageLabel.FOOTER}/>
        </article>
      </Fragment>
    )
  }
}

export default withRouter(Home)

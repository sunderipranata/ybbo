import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../components/Header'
import { Helmet } from 'react-helmet'

import './Home.scss'
import Hero from './components/Hero'
import Steps from './components/Steps'
import BusinessList from './components/BusinessList'
import Footer from '../../components/Footer'

import BusinessService from '../../services/BusinessService'
import PageLabel from '../../utils/googleAnalytics/PageLabel'

import { isMobile } from 'react-device-detect'

const PAGE_SIZE_DESKTOP = 9;
const PAGE_SIZE_MOBILE = 6;

class Home extends React.Component {

  state = {
    businessData: {
      businesses: [],
      total: 1
    },
    isLoading: true,
    category: null,
    currentPage: 1,
    pageSize: 1
  }

  componentDidMount() {
    const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    let category = this.props.match.params.category
    let page = this.props.match.params.page
    const offset = null

    //GET PAGE & CATEGORY FROM ROUTES
    if(typeof page === 'undefined' || page === null) {
      page = 1
    }
    if(typeof category === 'undefined' || category === null) {
      category = 'all'
    }

    const skip = (page - 1) * pageSize
    
    this.setState({
      category: category,
      currentPage: page,
      isLoading: true,
      pageSize: pageSize
    })

    this.fetchSimplifiedBusiness(pageSize, offset, category, skip, (res) => {
      if(res != null) {
        this.setState({
          businessData: res,
          isLoading: false
        })
      }
    })
    window.scrollTo({top: 0})
  }

  fetchSimplifiedBusiness = (limit, offset, category, skip, callback) => {
    BusinessService.getSimplifiedWithLimitOffset(limit, offset, category, skip, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        console.log('res', res)
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
        <meta property="og:url" content="https://yukbantubisnis.online/" />
        <meta property="og:title" content="Yuk Bantu Bisnis Online" />
        <meta property="og:description" content="Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia." />
        <meta property="og:image" content="https://i.ibb.co/1Lp3TXp/og-ybbo.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yukbantubisnis.online/" />
        <meta property="twitter:title" content="Yuk Bantu Bisnis Online" />
        <meta property="twitter:description" content="Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia." />
        <meta property="twitter:image" content="https://i.ibb.co/1Lp3TXp/og-ybbo.jpgg" />
      </Helmet>
    )
  }

  render = () => {
    const { businessData, isLoading, category, currentPage, pageSize } = this.state
    return (
      <Fragment>
        { this.renderHelmet() }
        <article>
          <Header pageLabel={PageLabel.HEADER}/>
            <main className="container__home">
              <Hero />
              <Steps />
              <BusinessList 
                pageLabel = {PageLabel.HOME_PAGE}
                isLoading = { isLoading }
                businessData = { businessData }
                category = { category }
                currentPage = { currentPage }
                pageSize = { pageSize }
              />
            </main>
          <Footer pageLabel={PageLabel.FOOTER}/>
        </article>
      </Fragment>
    )
  }
}

export default withRouter(Home)

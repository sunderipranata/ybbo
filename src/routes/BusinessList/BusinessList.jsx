import React, { Fragment } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import List from './components/List'

import BusinessService from '../../services/BusinessService'
import PageLabel from '../../utils/googleAnalytics/PageLabel'

import { isMobile } from 'react-device-detect'
import './BusinessList.scss'

const PAGE_SIZE_DESKTOP = 9;
const PAGE_SIZE_MOBILE = 6;

class BusinessList extends React.Component {
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

  componentDidMount = () => {
    this.handleFetchData()
    window.scrollTo({top: 0})
  }

  componentDidUpdate = (prevProps) => {
    const currentRouteInfo = this.getCategoryAndPageFromRouteProps(this.props)
    const prevRouteInfo = this.getCategoryAndPageFromRouteProps(prevProps)

    const curCategory = currentRouteInfo.category
    const curPage = currentRouteInfo.page
    const prevCategory = prevRouteInfo.category
    const prevPage = prevRouteInfo.page

    if(curCategory !== prevCategory || curPage !== prevPage) {
      this.handleFetchData()
    }
  }

  handleFetchData = () => {
    const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const routeInfo = this.getCategoryAndPageFromRouteProps(this.props)
    const category = routeInfo.category
    const page = routeInfo.page

    const skip = (page - 1) * pageSize
    
    this.setState({
      category: category,
      currentPage: page,
      isLoading: true,
      pageSize: pageSize
    })

    this.fetchBusinessFeed(pageSize, skip, category, (res) => {
      if(res != null) {
        this.setState({
          businessData: res,
          isLoading: false
        })
      }
    })
  }

  getCategoryAndPageFromRouteProps = (props) => {
    let category = props.match.params.category
    let page = props.match.params.page

    //GET PAGE & CATEGORY FROM ROUTES
    if(typeof page === 'undefined' || page === null) {
      page = 1
    }
    if(typeof category === 'undefined' || category === null) {
      category = 'all'
    }

    return {
      category: category,
      page: parseInt(page)
    }
  }

  fetchBusinessFeed = (limit, skip, category, callback) => {
    BusinessService.getFeed(limit, skip, category, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        callback(this.parseBusinessResponse(res.data))
      } else {
        callback(null)
      }
    })
  }

  parseBusinessResponse = (data) => {
    const total = data.meta.total
    const businesses = data.data.map((val) => {
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

  moveToPath = (path) => {
    this.props.history.push({
      pathname: path
    })
  }

  render() {
    const { businessData, isLoading, category, currentPage, pageSize } = this.state
    return (
      <Fragment>
        <article>
          <Header />
            <main className="container__blist">
              <List
                pageLabel = {PageLabel.HOME_PAGE}
                isLoading = { isLoading }
                businessData = { businessData }
                category = { category }
                currentPage = { currentPage }
                pageSize = { pageSize }
                moveToPath = { this.moveToPath }
              />
            </main>
          <Footer />
        </article>
      </Fragment>
    );
  }
}

export default BusinessList;
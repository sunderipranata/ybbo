import React from 'react'
import { Link } from 'react-router-dom'

import ClassNames from 'classnames'
import Responsive from 'react-responsive'
import { isMobile } from 'react-device-detect'
import BusinessCard from '../../../components/BusinessCard/BusinessCard'

import { GOOGLE_FORM_PATH } from '../../../routes'

import BaseAnalyticsComponents from "../../../utils/googleAnalytics/BaseAnalyticsComponent"
import EventLabel from "../../../utils/googleAnalytics/EventLabel"

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const PAGE_SIZE_DESKTOP = 9;
const PAGE_SIZE_MOBILE = 6;
const categories = {
  all: 'Semua Kategori',
  food_and_beverage: 'Makanan dan Minuman',
  fashion: 'Fashion',
  hobby: 'Hobi',
  beauty: 'Kecantikan'
}

class BusinessList extends BaseAnalyticsComponents {
  state = {
    hasPrev: false,
    hasNext: true,
    dropdownIsOpened: false,
    page: {
      at: 1,
      total: 1,
      lastIds: []   //to keep track last id offset when switching between pages
    },
    businessData: {
      businesses: [],
      total: 1
    },
    isLoading: true,
    category: 'all'
  }

  componentWillMount = () => {
    this.setState({
      isLoading: true
    })
  }

  componentDidMount = () => {
    const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const offset = null
    const { category } = this.state

    this.props.fetchData(limit, offset, category, (res) => {
      if(res !== null) {
        const businessData = {
          businesses: res.businesses,
          total: res.total
        }
        this.setState({
          businessData: businessData
        }, () => {
          this.updateTotalPages()
          this.toggleLoading(false)
        })

        //there are businesses, so update and push to lastIds
        if(res.businesses.length > 0) {
          const lastId = res.businesses[res.businesses.length - 1].id
          const curPage = { ...this.state.page }
          curPage.lastIds.push(lastId)
          this.setState({
            page: curPage
          })
        }
      }
    })
  }

  updateTotalPages = () => {
    const { businessData: { total } } = this.state
    const size = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const totalPage =  Math.ceil(total / size)

    const curPage = { ...this.state.page }
    curPage.total = totalPage
    this.setState({
      page: curPage
    }, function() {
      this.checkPageUpdate()
    })
  }

  toggleLoading = (loading) => {
    this.setState({
      isLoading: loading
    })
  }

  showDropdown = () => {
    this.setState({ dropdownIsOpened: true })
    document.addEventListener('click', this.hideDropdown)
  }

  hideDropdown = () => {
    this.setState({ dropdownIsOpened: false })
    document.removeEventListener('click', this.hideDropdown)
  }

  handleMovePrevPage = () => {
    const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const { category } = this.state

    //loading
    this.toggleLoading(true)
    window.scrollTo({behavior: 'smooth', top: this.businessList.offsetTop - 100})

    //decrement page
    const curPage = { ...this.state.page }
    curPage.at--

    //pop
    curPage.lastIds.pop()
    const offset = curPage.lastIds.length > 1 ? curPage.lastIds[curPage.lastIds.length - 2] : null
    this.setState({
      page: curPage
    })

    this.props.fetchData(limit, offset, category, (res) => {
      if(res !== null) {
        const businesses = res.businesses
        this.setState({
          businessData: { ...this.state.businessData, businesses: businesses }
        }, () => {
          this.toggleLoading(false)
          this.checkPageUpdate()
        })
      }
    })
  }

  handleMoveNextPage = () => {
    const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const { category } = this.state
    //loading
    this.toggleLoading(true)

    window.scrollTo({behavior: 'smooth', top: this.businessList.offsetTop - 100})

    //increment page
    const curPage = { ...this.state.page }
    curPage.at++

    //get last offset
    const offset = curPage.lastIds[curPage.lastIds.length - 1]

    this.props.fetchData(limit, offset, category, (res) => {
      if(res !== null) {
        const businesses = res.businesses
        this.setState({
          businessData: { ...this.state.businessData, businesses: businesses }
        }, () => {
          //push current last id
          if(res.businesses.length > 0) {
            const lastId = res.businesses[res.businesses.length - 1].id
            curPage.lastIds.push(lastId)
            this.setState({
              page: curPage
            }, () => {
              this.toggleLoading(false)
              this.checkPageUpdate()
            })
          } else {
            this.toggleLoading(false)
          }
        })
      }
    })
  }

  checkPageUpdate = () => {
    const { page } = this.state

    if(page.at === 1) {
      this.setState({
        hasPrev: false
      })
    } else if(page.at > 1) {
      this.setState({
        hasPrev: true
      })
    }

    if(page.at < page.total) {
      this.setState({
        hasNext: true
      })
    } else if(page.at === page.total) {
      this.setState({
        hasNext: false
      })
    }
  }

  handleCategoryChange = (category) => {
    this.toggleLoading(true)
    this.handleResetPage()
    this.setState({
      category: category
    })

    this.trackClickWithValue(EventLabel.CATEGORY_FILTER,category)

    const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const offset = null
    this.props.fetchData(limit, offset, category, (res) => {
      if(res !== null) {
        const businessData = {
          businesses: res.businesses,
          total: res.total
        }
        this.setState({
          businessData: businessData
        }, () => {
          this.updateTotalPages()
          this.toggleLoading(false)
        })

        //there are businesses, so update and push to lastIds
        if(res.businesses.length > 0) {
          const lastId = res.businesses[res.businesses.length - 1].id
          const curPage = { ...this.state.page }
          curPage.lastIds.push(lastId)
          this.setState({
            page: curPage
          })
        }
      }
    })
  }

  handleResetPage = () => {
    const page = {
      at: 1,
      total: 1,
      lastIds: []
    }

    this.setState({
      page: page
    })
  }

  onBusinessCardClick = (businessId) => {
    this.trackClickWithValue(EventLabel.MERCHANT_CARD,businessId)
  }

  renderLoading = () => {
    const size = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const display = []
    for(let i = 0; i < size; i++) {
      display.push(
        <div className="item" key = {100 + i}>
          <BusinessCard loading />
        </div>
      )
    }

    return (
      <div className="business__content">
        { display }
      </div>
    )
  }

  renderBusinesses = () => {
    const { businessData } = this.state
    const display = businessData.businesses.map((b) => {
      const backersCount = b.backersCount
      const category = categories[b.category]
      const id = b.id
      const location = b.location
      const thumbnailUrl = b.thumbnailUrl
      const name = b.name
      const slug = b.slug

      const link = (typeof slug === 'undefined' || slug === null) ? id : slug

      return (
        <Link onClick={this.onBusinessCardClick.bind(this,id)} to={'/b/' + link} className="item" key = { id }>
          <BusinessCard
            img = { thumbnailUrl }
            title = { name }
            location = { location }
            category = { category }
            backers = { backersCount } />
        </Link>
        // <a href="/" className="item" key = {id}>

        // </a>
      )
    })

    if(display.length > 0) {
      return (
        <div className="business__content">
          { display }
        </div>
      )
    } else {
      return (
        <div className="business__empty">
          <span role="img" aria-label="Pensive Face" className="emoji">😔</span>
          <h4 className="title">Belum ada bisnis di kategori {categories[this.state.category]} nih.</h4>
          <p>Kamu punya bisnis di kategori ini? Yuk Daftar!</p>
          <a href={GOOGLE_FORM_PATH} target="_blank" className="button button--main" rel="noopener noreferrer">Daftarkan Bisnismu</a>
        </div>
      )
    }
  }

  renderBusinessesCategoriesDesktop = () => {
    const { category } = this.state
    const baseClass = "category-item "
    const classAll = category === 'all' ? baseClass + "active" : baseClass
    const classFnB = category === 'food_and_beverage' ? baseClass + "active" : baseClass
    const classFashion = category === 'fashion' ? baseClass + "active" : baseClass
    const classHobby = category === 'hobby' ? baseClass + "active" : baseClass
    const classBeauty = category === 'beauty' ? baseClass + "active" : baseClass

    return (
      <Desktop>
        <div className="business__filter">
          <ul className="filter__category">
            <li>
              <button
                className= { classAll }
                onClick = { this.handleCategoryChange.bind(this, 'all') }>
                { categories['all'] }
              </button>
            </li>
            <li>
              <button
                className= { classFnB }
                onClick = { this.handleCategoryChange.bind(this, 'food_and_beverage') }>
                { categories['food_and_beverage'] }
              </button>
            </li>
            <li>
              <button
                className= { classFashion }
                onClick = { this.handleCategoryChange.bind(this, 'fashion') }>
                { categories['fashion'] }
              </button>
            </li>
            <li>
              <button
                className= { classBeauty }
                onClick = { this.handleCategoryChange.bind(this, 'beauty') }>
                { categories['beauty'] }
              </button>
            </li>
            <li>
              <button
                className= { classHobby }
                onClick = { this.handleCategoryChange.bind(this, 'hobby') }>
                { categories['hobby'] }
              </button>
            </li>
          </ul>
        </div>
      </Desktop>
    )
  }

  renderBusinessesCategoriesMobile = () => {
    const { dropdownIsOpened, category } = this.state

    return (
      <Mobile>
        <div className="select-dropdown" onClick={this.showDropdown}>
          <div className={ClassNames('select-dropdown__content', { 'is-open': dropdownIsOpened })}>
            <div className="select-dropdown__container">
              <div className="label-wrapper">
                <div className="selected-label">
                  { categories[category] }
                </div>
              </div>
              <div className="box-positioner">
                <div className="options-box">
                  <div className="scroll-area scrollbar">
                    <div
                      className="item"
                      onClick = { this.handleCategoryChange.bind(this, 'all') }>
                      { categories['all'] }
                    </div>
                    <div
                      className="item"
                      onClick = { this.handleCategoryChange.bind(this, 'food_and_beverage') }>
                      { categories['food_and_beverage'] }
                    </div>
                    <div
                      className="item"
                      onClick = { this.handleCategoryChange.bind(this, 'fashion') }>
                      { categories['fashion'] }
                    </div>
                    <div
                      className="item"
                      onClick = { this.handleCategoryChange.bind(this, 'beauty') }>
                      { categories['beauty'] }
                    </div>
                    <div
                      className="item"
                      onClick = { this.handleCategoryChange.bind(this, 'hobby') }>
                      { categories['hobby'] }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Mobile>

    )
  }

  renderPagination = () => {
    const {
      hasPrev,
      hasNext,
      page
    } = this.state

    return ( page.total > 1 &&
      <div className="business__pagination">
        <button
          className={ClassNames('btn__prev', { 'hidden': hasPrev === false })}
          onClick = { this.handleMovePrevPage.bind(this) }
        >
          Sebelumnya
        </button>

        { page.at } / { page.total }

        <button
          className={ClassNames('btn__next', { 'hidden': hasNext === false })}
          onClick = { this.handleMoveNextPage.bind(this) }
        >
          Selanjutnya
        </button>
      </div>
    )
  }

  render = () => {
    const { isLoading } = this.state

    return (
      <section className="home__business" ref={ (ref) => this.businessList=ref }>
        <h2 className="business__title">Daftar Bisnis Online</h2>

        { this.renderBusinessesCategoriesDesktop() }
        { this.renderBusinessesCategoriesMobile() }
        { isLoading ? this.renderLoading() : this.renderBusinesses() }
        { this.renderPagination() }

      </section>
    )
  }
}

export default BusinessList
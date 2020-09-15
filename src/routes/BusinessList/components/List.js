import React from 'react'
import { Link } from 'react-router-dom'

import ClassNames from 'classnames'
import Responsive from 'react-responsive'
import BusinessCard from '../../../components/BusinessCard/BusinessCard'

import { GOOGLE_FORM_PATH } from '../../../routes'

import BaseAnalyticsComponents from "../../../utils/googleAnalytics/BaseAnalyticsComponent"
import EventLabel from "../../../utils/googleAnalytics/EventLabel"

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const categories = {
  all: 'Semua Kategori',
  food_and_beverage: 'Makanan dan Minuman',
  fashion: 'Fashion',
  hobby: 'Hobi',
  beauty: 'Kecantikan',
  others: 'Lainnya'
}

class List extends BaseAnalyticsComponents {
  state = {
    hasPrev: false,
    hasNext: true,
    dropdownIsOpened: false,
    page: {
      at: 1,
      total: 1
    },
    businessData: {
      businesses: [],
      total: 1
    },
    isLoading: true,
    category: 'all',
    pageSize: 1
  }

  componentDidMount = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    //on change do something
    const { businessData, isLoading, category, currentPage, pageSize } = nextProps

    if(typeof businessData !== 'undefined' && businessData !== null) {
      this.setState({
        businessData: businessData
      }, () => {
        if(typeof currentPage !== 'undefined' && currentPage !== null) {
          const curPage = { ...this.state.page }
          curPage.at = currentPage

          this.setState({
            page: curPage
          }, () => {
            this.updateTotalPages()
          })
        }
      })
    }

    if(typeof isLoading !== 'undefined' && isLoading !== null) {
      this.setState({
        isLoading: isLoading
      })
    }

    if(typeof category !== 'undefined' && category !== null) {
      this.setState({
        category: category
      })
    }

    if(typeof pageSize !== 'undefined' && pageSize !== null) {
      this.setState({
        pageSize: pageSize
      })
    }
  }

  updateTotalPages = () => {
    const { businessData: { total }, pageSize } = this.state
    const size = pageSize
    const totalPage =  Math.ceil(total / size)
    const curPage = { ...this.state.page }
    console.log('updateTotalPages', total, pageSize, totalPage)
    curPage.total = totalPage
    this.setState({
      page: curPage
    }, () => {
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
    const { category, page } = this.state
    window.scrollTo({behavior: 'smooth', top: this.businessList.offsetTop - 100})

    const prevPage = parseInt(page.at) - 1

    const path = `/c/${ category }/${ prevPage }` 
    this.props.moveToPath(path)
  }

  handleMoveNextPage = () => {
    const { category, page } = this.state
    window.scrollTo({behavior: 'smooth', top: this.businessList.offsetTop - 100})

    const nextPage = parseInt(page.at) + 1
    const path = `/c/${ category }/${ nextPage }`
    this.props.moveToPath(path)
  }

  checkPageUpdate = () => {
    const { page } = this.state
    console.log('checkPageUpdate', page)

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

    const page = 1
    const path = `/c/${ category }/${ page }`
    this.props.moveToPath(path)
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

  onBusinessCardClick = (businessName) => {
    this.trackClickWithValue(EventLabel.MERCHANT_CARD,businessName)
  }

  renderLoading = () => {
    const { pageSize } = this.state
    const size = pageSize
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
        <Link onClick={this.onBusinessCardClick.bind(this,name)} to={'/b/' + link} className="item" key = { id }>
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
    const classOthers = category === 'others' ? baseClass + "active" : baseClass

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
            <li>
              <button
                className= { classOthers }
                onClick = { this.handleCategoryChange.bind(this, 'others') }>
                { categories['others'] }
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
                    <div
                      className="item"
                      onClick = { this.handleCategoryChange.bind(this, 'others') }>
                      { categories['others'] }
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

export default List
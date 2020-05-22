import React, { Component } from 'react'

import ClassNames from 'classnames'
import Responsive from 'react-responsive'
import { isMobile } from 'react-device-detect'

import BusinessCard from '../../../components/BusinessCard/BusinessCard'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />
const PAGE_SIZE_DESKTOP = 6;
const PAGE_SIZE_MOBILE = 3;

class BusinessList extends Component {
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
    isLoading: true
  }

  componentWillMount = () => {
    this.setState({
      isLoading: true
    })
  }

  componentDidMount = () => {
    const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const offset = null

    this.props.fetchData(limit, offset, (res) => {
      if (res !== null) {
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
      }
    })
  }

  updateTotalPages = () => {
    const { businessData: { total } } = this.state
    const size = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    const totalPage =  Math.ceil(total / size)

    let curPage = { ...this.state.page }
    curPage.total = totalPage
    this.setState({
      page: curPage
    })
  }

  toggleLoading = (loading) => {
    this.setState({
      loading: loading
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

  renderLoading = () => {
    return (
      <div className="business__content">
        <a href="/" className="item">
            <BusinessCard loading />
          </a>
          <a href="/" className="item">
            <BusinessCard loading />
          </a>
          <a href="/" className="item">
            <BusinessCard loading />
          </a>
      </div>
    )
  }

  renderBusinesses = () => {
    const { businessData } = this.state
    const display = businessData.businesses.map((b) => {
      const backersCount = b.backersCount
      const category = b.category
      const id = b.id
      const location = b.location
      const thumbnailUrl = b.thumbnailUrl

      return (
        <a href="/" className="item" key = {id}>
          <BusinessCard 
            img = { thumbnailUrl } 
            title = "Nama Bisnis" 
            location = { location } 
            category = { category } 
            backers = { backersCount } />
        </a>
      )
    })

    return (
      <div className="business__content">
        { display }
      </div>
    )
  }

  render() {
    const { 
      hasPrev, 
      hasNext, 
      dropdownIsOpened,
      loading,
      page
    } = this.state

    return (
      <section className="home__business">
        <h2 className="business__title">Daftar Bisnis Online</h2>
        <Desktop>
          <div className="business__filter">
            <ul className="filter__category">
              <li><a href="/" className="category-item active">Semua</a></li>
              <li><a href="/" className="category-item">Makanan & Minuman</a></li>
              <li><a href="/" className="category-item">Fashion</a></li>
              <li><a href="/" className="category-item">Kecantikan</a></li>
              <li><a href="/" className="category-item">Hobi</a></li>
            </ul>
          </div>
        </Desktop>
        <Mobile>
          <div className="select-dropdown" onClick={this.showDropdown}>
            <div className={ClassNames('select-dropdown__content', { 'is-open': dropdownIsOpened })}>
              <div className="select-dropdown__container">
                <div className="label-wrapper">
                  <div className="selected-label">
                    Semua Kategori
                  </div>
                </div>
                <div className="box-positioner">
                  <div className="options-box">
                    <div className="scroll-area scrollbar">
                      <div className="item">Semua Kategori</div>
                      <div className="item">Makanan & Minuman</div>
                      <div className="item">Fashion</div>
                      <div className="item">Kecantikan</div>
                      <div className="item">Hobi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Mobile>
        
          {
            loading ? this.renderLoading() : this.renderBusinesses()
          }

        <div className="business__pagination">
          <a href="/" className={ClassNames('btn__prev', { 'hidden': hasPrev === false })}>
            Sebelumnya
          </a>
          { page.at } / { page.total }
          <a href="/" className={ClassNames('btn__next', { 'hidden': hasNext === false })}>
            Selanjutnya
          </a>
        </div>
      </section>
    )
  }
}

export default BusinessList
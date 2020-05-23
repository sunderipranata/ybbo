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
      total: 1,
      lastIds: []   //to keep track last id offset when switching between pages
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

  //TODO
  handleMovePrevPage = () => {
    console.log('prev')
  }

  //TODO
  handleMoveNextPage = () => {
    console.log('next')
    //loading
    this.toggleLoading(true)
    
    //increment page
    const curPage = { ...this.state.page }
    curPage.at++
    this.setState({
      page: curPage
    })

    console.log('curPage', curPage)

    // const limit = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    // const offset = curPage.lastIds[curPage.lastIds.length - 1]

    // this.fetch(limit, offset)
  }

  //TODO filter category

 
  renderLoading = () => {
    const size = isMobile ? 3 : 6
    const display = []
    for(let i = 0; i < size; i++) {
      display.push(
        <a href="/" className="item" key = {100 + i}>
          <BusinessCard loading />
        </a>
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
    console.log('business data', businessData)
    const display = businessData.businesses.map((b) => {
      const backersCount = b.backersCount
      const category = b.category
      const id = b.id
      const location = b.location
      const thumbnailUrl = b.thumbnailUrl
      const name = b.name

      return (
        <a href="/" className="item" key = {id}>
          <BusinessCard 
            img = { thumbnailUrl } 
            title = { name }
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
      isLoading,
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
            isLoading ? this.renderLoading() : this.renderBusinesses()
          }

        <div className="business__pagination">
          <button className={ClassNames('btn__prev', { 'hidden': hasPrev === false })} onClick = { this.handleMovePrevPage.bind(this) }>
            Sebelumnya
          </button>
          { page.at } / { page.total }
          <button href="/" className={ClassNames('btn__next', { 'hidden': hasNext === false })} onClick = { this.handleMoveNextPage.bind(this) }>
            Selanjutnya
          </button>
        </div>
      </section>
    )
  }
}

export default BusinessList
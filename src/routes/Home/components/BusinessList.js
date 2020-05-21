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
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { businessData } = nextProps
    const totalPage = this.calculateTotalPages(businessData)

    let curPage = {...this.state.page}
    curPage.total = totalPage
    this.setState({
      page: curPage
    }, () => {
      console.log('business list state', this.state)
    })
  }

  calculateTotalPages = (data) => {
    const size = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    return Math.ceil(data.total / size)
  }

  showDropdown = () => {
    this.setState({ dropdownIsOpened: true })
    document.addEventListener('click', this.hideDropdown)
  }

  hideDropdown = () => {
    this.setState({ dropdownIsOpened: false })
    document.removeEventListener('click', this.hideDropdown)
  }

  render() {
    const { hasPrev, hasNext, dropdownIsOpened } = this.state

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
            <div className={ClassNames('select-dropdown__content', {'is-open': dropdownIsOpened })}>
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
          <a href="/" className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Bali" category="Hobi" backers={20} />
          </a>
          <a href="/" className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a href="/" className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a href="/" className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a href="/" className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a href="/" className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
        </div>
        <div className="business__pagination">
          <a href="/" className={ClassNames('btn__prev', { 'hidden': hasPrev === false})}>
            Sebelumnya
          </a>
          1 / 5
          <a href="/" className={ClassNames('btn__next', { 'hidden': hasNext === false})}>
            Selanjutnya
          </a>
        </div>
      </section>
    )
  }
}

export default BusinessList
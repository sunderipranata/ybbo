import React, { Component } from 'react';
import BusinessCard from '../../../components/BusinessCard'
import { Link } from 'react-router-dom'

import { BUSINESS_LIST_PATH } from '../../../routes'

const categories = {
  all: 'Semua Kategori',
  food_and_beverage: 'Makanan dan Minuman',
  fashion: 'Fashion',
  hobby: 'Hobi',
  beauty: 'Kecantikan',
  others: 'Lainnya'
}
class BusinessFeatured extends BaseAnalyticsComponent {

  state = {
    businesses: [],
    isLoading: true,
    pageSize: 1
  }

  componentWillReceiveProps = (nextProps) => {
    const { businessData, isLoading, pageSize } = nextProps
    if(typeof businessData !== 'undefined' && businessData !== null) {
      this.setState({
        businesses: businessData.businesses
      })
    }

    if(typeof isLoading !== 'undefined' && isLoading !== null) {
      this.setState({
        isLoading: isLoading
      })
    }

    if(typeof pageSize !== 'undefined' && pageSize !== null) {
      this.setState({
        pageSize: pageSize
      })
    }
  }

  renderLoading = () => {
    const { pageSize } = this.state
    const display = []

    for(let i = 0; i < pageSize; i++) {
      display.push(
        <div className = "item" key = { 100 + i }>
          <BusinessCard loading/>
        </div>
      )
    }

    return (
      <div className = "business__content">
        { display }
      </div>
    )
  }

  onBusinessCardClick = (businessName) => {
    this.trackClickWithValue(EventLabel.MERCHANT_CARD,businessName)
  }

  renderBusinesses = () => {
    const { businesses } = this.state
    const display = businesses.map((b) => {
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
      )
    })

    return (
      <div>
        <div className = "business__content">
          { display }
        </div>
        <div className="business__load">
          <a className="button button--main" href={BUSINESS_LIST_PATH}>
            Lihat Semua
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { isLoading } = this.state

    return (
      <section className="home__business">
        <h2 className="business__title">Featured Bisnis</h2>
        
        { isLoading ? this.renderLoading() : this.renderBusinesses() }
        
      </section>
    )
  }
}

export default BusinessFeatured
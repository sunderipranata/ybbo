import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import BusinessCard from '../../../components/BusinessCard/BusinessCard'

import BaseAnalyticsComponents from "../../../utils/googleAnalytics/BaseAnalyticsComponent"
import EventCategory from "../../../utils/googleAnalytics/EventCategory"
import EventLabel from "../../../utils/googleAnalytics/EventLabel"

const RANDOM_SIZE = 3
const categories = {
  food_and_beverage: 'Makanan dan Minuman',
  fashion: 'Fashion',
  hobby: 'Hobi',
  beauty: 'Kecantikan'
}

class Recomendations extends BaseAnalyticsComponents {
  static propTypes = {
    isLoading: PropTypes.bool,
    businessDetail: PropTypes.object
  }

  state = {
    isLoading: true,
    randomBusinesses: []
  }

  componentWillMount = () => {
    this.setState({
      isLoading: this.props.isLoading
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { randomBusinesses } = this.state
    const { businessDetail } = nextProps
    if(randomBusinesses.length === 0) {
      if(typeof businessDetail !== 'undefined' && businessDetail !== null) {
        this.toggleLoading(true)
        this.setState({
          businessDetail: businessDetail
        })

        const category = businessDetail.category
        nextProps.fetchData(category, RANDOM_SIZE, (res) => {
          if(res !== null) {
            this.setState({
              randomBusinesses: res
            }, () => {
              this.toggleLoading(false)
            })
          }
        })
      }
    }
  }

  onBusinessCardClick = (businessId) => {
    this.trackClickWithValue(EventCategory.BUSINESS_DETAIL_PAGE, EventLabel.HELP_OTHER_BUSINESS_CARD,businessId)
  }

  toggleLoading = (loading) => {
    this.setState({
      isLoading: loading
    })
  }

  renderLoading = () => {
    return (
      <div className="container container__recommendation">
        <BusinessCard loading />
        <BusinessCard loading />
        <BusinessCard loading />
      </div>
    )
  }

  renderRecommendations = () => {
    const { randomBusinesses } = this.state
    const display = []
    randomBusinesses.forEach((b) => {
      const link = (typeof b.slug === 'undefined' || b.slug === null) ? b.id : b.slug
      display.push(
        <Link onClick = {this.onBusinessCardClick.bind(this,b.id)} to={'/b/' + b.id} className="item" key = { b.id }>
          <BusinessCard
            img = { b.thumbnailUrl }
            title = { b.name }
            location = { b.location }
            category = { categories[b.category] }
            backers = { b.backersCount } />
        </Link>
      )
    })

    return (
      <div className="container container__recommendation">
        { display }
      </div>
    )
  }

  render() {
    const { isLoading } = this.props

    return (
      <Fragment>
        { isLoading ? this.renderLoading() : this.renderRecommendations() }
      </Fragment>
    )
  }
}

export default Recomendations
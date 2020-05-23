import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import BusinessCard from '../../../components/BusinessCard/BusinessCard'

class Recomendations extends Component {
  static propTypes = {
    isLoading: PropTypes.bool
  }

  render() {
    const { isLoading } = this.props

    return (
      <Fragment>
      {isLoading ? 
        <div className="container container__recommendation">
          <a href="/">
            <BusinessCard loading />
          </a>
          <a href="/">
            <BusinessCard loading />
          </a>
          <a href="/">
            <BusinessCard loading />
          </a>
        </div>
        :
        <div className="container container__recommendation">
          <a href="/">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a href="/">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a href="/">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Bali" category="Hobi" backers={20} />
          </a>
        </div>
       }
      </Fragment>
    )
  }
}

export default Recomendations
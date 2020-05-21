import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Loader.scss'

class Loader extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    marginBottom: PropTypes.number
  }

  render() {
    const { width, height, borderRadius, marginBottom } = this.props

    return (
      <div className="shimmer" 
        style={ 
          width > 0 ? { width: width, height: height, borderRadius: borderRadius, marginBottom: marginBottom } : 
          { width: "100%", height: height, borderRadius: borderRadius, marginBottom: marginBottom}}
      />
    )
  }
}

export default Loader

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './StepCard.scss'

class StepCard extends Component {
  static propTypes = {
    index: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string
  }

  render() {
    const { index, title, desc } = this.props

    return (
      <div className="step__card">
        <div className="step__card--index">#{index}</div>
        <p className="step__card--title">{title}</p>
        <p className="step__card--desc">{desc}</p>
      </div>
    )
  }
}

export default StepCard
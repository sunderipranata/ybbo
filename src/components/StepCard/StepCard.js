import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './StepCard.scss'

class StepCard extends Component {
  static propTypes = {
    index: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    children: PropTypes.object
  }

  render() {
    const { index, title, desc, children } = this.props

    return (
      <div className="step__card">
        <div className="step__card--index">#{index}</div>
        <p className="step__card--title">{title}</p>
        { desc != null && <p className="step__card--desc">{desc}</p> }
        { children != null &&
          <div className="step__card--desc">
            {children}
          </div>
        }
      </div>
    )
  }
}

export default StepCard
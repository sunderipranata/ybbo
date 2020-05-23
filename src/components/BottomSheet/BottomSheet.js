import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import ClassNames from 'classnames'

import './BottomSheet.scss'

class BottomSheet extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    display: PropTypes.bool,
    children: PropTypes.object,
  }

  render () {
    return (
      <Fragment>
        <div
          className={ClassNames('bs-overlay ', {
            'bs-overlay--show': this.props.display
          })}
          onClick={this.props.onClose}
        />
        <div className={ClassNames('bottom-sheets', { 'bottom-sheets--show': this.props.display })}>
          <div className='bottom-sheets__title'>
            <div className='bottom-sheets__title-close' onClick={this.props.onClose} />
            {this.props.title}
          </div>
          <div className='bottom-sheets__content'>{this.props.children}</div>
        </div>
      </Fragment>
    )
  }
}

export default BottomSheet
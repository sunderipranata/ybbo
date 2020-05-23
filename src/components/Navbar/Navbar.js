
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import './Navbar.scss'

class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    const { title } = this.props
    return (
      <nav className="navbar">
        <button onClick={this.props.history.goBack} className="navbar__back" />
        <div className="navbar__title">
          <p className="text">{title}</p>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar)

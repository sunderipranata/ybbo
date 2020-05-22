
import React, { Component } from 'react'
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
        <a href="javascript:history.go(-1)" className="navbar__back" />
        <div className="navbar__title">
          <p className="text">{title}</p>
        </div>
      </nav>
    );
  }
}

export default Navbar

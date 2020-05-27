
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './Navbar.scss'

class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string,
    prevPath: PropTypes.string
  }

  render() {
    const { title, prevPath } = this.props
    return (
      <nav className="navbar">
        <Link to={prevPath} className="navbar__back" />
        <div className="navbar__title">
          <p className="text">{title}</p>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar)

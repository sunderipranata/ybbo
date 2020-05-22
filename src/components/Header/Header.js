import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import { HOME_PATH, ABOUT_PATH } from '../../routes'

import './Header.scss'

class Header extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        active: false,
        pathLink : ''
      }
    }
    
    componentDidMount() {
      this.setState({
        pathLink: window.location.pathname
      })
    }

    render() {
      const { active, pathLink } = this.state

      return (
        <Fragment>
          <header>
            <ul className={ClassNames('nav-list', { 'nav-list--active': active })}>
              <li>
                <Link className={ClassNames('nav__link', { 'active': pathLink === HOME_PATH })} to={HOME_PATH}>Beranda</Link>
              </li>
              <li>
                <Link className={ClassNames('nav__link', { 'active': pathLink === ABOUT_PATH })} to={ABOUT_PATH}>Tentang Kami</Link>
              </li>
              <li>
                <Link className="button button--ghost" to={"#"}>Daftarkan Bisnis mu</Link>
              </li>
            </ul>
          </header>
        </Fragment>
      );
    }
}

export default Header;
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import Responsive from 'react-responsive'

import { HOME_PATH, ABOUT_PATH, GOOGLE_FORM_PATH } from '../../routes'

import './Header.scss'
import Logo from '../../assets/logo-ybbo.png'

const Desktop = props => <Responsive {...props} minWidth={768} />

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
            <Desktop>
              <a href={HOME_PATH} className="header__title">
                <img src={Logo} className="logo" alt="Logo Yuk Bantu Bisnis Online" />
                <p className="name">YukBantuBisnis.Online</p>
              </a>
            </Desktop>
            <ul className={ClassNames('nav-list', { 'nav-list--active': active })}>
              <li>
                <Link className={ClassNames('nav__link', { 'active': pathLink === HOME_PATH })} to={HOME_PATH}>Beranda</Link>
              </li>
              <li>
                <Link className={ClassNames('nav__link', { 'active': pathLink === ABOUT_PATH })} to={ABOUT_PATH}>Tentang Kami</Link>
              </li>
              <li>
                <a className="button button--ghost" href={GOOGLE_FORM_PATH} target="_blank" rel="noopener noreferrer">Daftarkan Bisnismu</a>
              </li>
            </ul>
          </header>
        </Fragment>
      );
    }
}

export default Header;
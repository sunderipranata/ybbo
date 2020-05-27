import React, { Fragment } from 'react'
import ClassNames from 'classnames'
import Responsive from 'react-responsive'

import { HOME_PATH, ABOUT_PATH, GOOGLE_FORM_PATH } from '../../routes'

import './Header.scss'
import Logo from '../../assets/logo-ybbo.png'

import BaseAnalyticsComponents from "../../utils/googleAnalytics/BaseAnalyticsComponent"
import EventLabel from "../../utils/googleAnalytics/EventLabel"

const Desktop = props => <Responsive {...props} minWidth={768} />

class Header extends BaseAnalyticsComponents {
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

    onOpenHomePage = () => {
      this.trackClick(EventLabel.HOME_BUTTON)
    }

    onOpenAboutPage = () => {
      this.trackClick(EventLabel.ABOUT_US_BUTTON)
    }

    onRegisterButtonClicked = () => {
      this.trackClick(EventLabel.REGISTER_BUTTON)
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
                <a onClick={this.onOpenHomePage} className={ClassNames('nav__link', { 'active': pathLink === HOME_PATH })} href={HOME_PATH}>Beranda</a>
              </li>
              <li>
                <a onClick={this.onOpenAboutPage} className={ClassNames('nav__link', { 'active': pathLink === ABOUT_PATH })} href={ABOUT_PATH}>Tentang Kami</a>
              </li>
              <li>
                <a onClick={this.onRegisterButtonClicked} className="button button--ghost" href={GOOGLE_FORM_PATH} target="_blank" rel="noopener noreferrer">Daftarkan Bisnismu</a>
              </li>
            </ul>
          </header>
        </Fragment>
      );
    }
}

export default Header;
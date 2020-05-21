import React, { Component } from 'react'
import './Footer.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__main">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-title">
                Kontak Kami
              </h3>
              <p className="footer-desc">
                <span style={{ marginRight: '24px' }}>Email</span>
                <a href="mailto:YukBantuBisnis.Online@gmail.com">YukBantuBisnis.Online@gmail.com</a>
              </p>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">
                Follow <small>@YukBantuBisnis.Online</small>
              </h3>
              <a href="/" className="social-media" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'instagram']}  size="lg" /></a>
              <a href="/" className="social-media" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']}  size="lg" /></a>
            </div>
          </div>
          <p className="footer-notes">
            © 2020 All Rights Reserved -{' '}
            YukBantuBisnis.Online
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
import React, { Component } from 'react'
import './Footer.scss'

import { INSTAGRAM_PATH, ABOUT_PATH } from '../../routes'

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
              <table className="footer-desc">
                <tbody>
                  <tr>
                    <td className="item">Email</td>
                    <td><a href="mailto:YukBantuBisnis.Online@gmail.com">YukBantuBisnis.Online@gmail.com</a></td>
                  </tr>
                  <tr>
                    <td className="item">Instagram</td>
                    <td><a href={INSTAGRAM_PATH}  target="_blank" rel="noopener noreferrer">@YukBantuBisnis.Online</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">
                Tentang Kami
              </h3>
              <p className="footer-desc">
                Kami adalah sekelompok software engineers dari Indonesia yang mencoba untuk membantu UMKM di tengah pandemi COVID-19.<br />
                <a href={ABOUT_PATH}>Selengkapnya &rarr;</a>
              </p>
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
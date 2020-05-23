import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconVerified from '../assets/ic-verified.png'
import Loader from '../../../components/Loader'

class BusinessDetailBackers extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string
  }

  state = {
    isEmpty: false
  }

  render() {
    const { isLoading, title } = this.props
    const { isEmpty } = this.state

    return (
      <Fragment>
        <h2 className="bd-content__title">Pendukung <small>(200)</small></h2>
        { isLoading ? 
            <ul className="bd-content__backers">
              <li>
                <Loader height={12} borderRadius={8} marginBottom={8} />
                <Loader width={200} height={12} borderRadius={8} />
              </li>
              <li>
                <Loader height={12} borderRadius={8} marginBottom={8} />
                <Loader width={200} height={12} borderRadius={8} />
              </li>
              <li>
                <Loader height={12} borderRadius={8} marginBottom={8} />
                <Loader width={200} height={12} borderRadius={8} />
              </li>
              <li>
                <Loader height={12} borderRadius={8} marginBottom={8} />
                <Loader width={200} height={12} borderRadius={8} />
              </li>
              <li>
                <Loader height={12} borderRadius={8} marginBottom={8} />
                <Loader width={200} height={12} borderRadius={8} />
              </li>
            </ul>
          :
          isEmpty ? 
            <div className="bd-content__empty">
              <span role="img" aria-label="Crying Face" className="emoji">😢</span>
              <p className="title">{title} belum ada pendukungnya nih.</p>
              <p className="desc">Yuk jadi yang pertama dengan mendaftarkan akun mu.</p>
            </div>
            : 
            <Fragment>
              <ul className="bd-content__backers">
                <li>
                  <p className="backers-title">Anonim telah mendaftar untuk mendukung</p>
                  <p className="backers-time">17 menit yang lalu</p>
                </li>
                <li>
                  <div className="backers-title">
                    <p className="backers-title"><a href="/" target="_blank">@sunderi.pranata</a> telah mendaftar untuk mendukung</p>
                  </div>
                  <p className="backers-time">30 menit yang lalu</p>
                </li>
                <li>
                  <p className="backers-title">
                    <span className="text">Kata <a href="/" target="_blank">@devinryanriota</a>: "enak banget, wajib dipesan"</span>
                    <span className="tooltip">
                      <img src={IconVerified} alt="Terverfikasi" className="backers-verified" />
                      <span class="tooltiptext">
                        Kami sudah melakukan pengecekan bahwa <a href="/" target="_blank">@devinryanriota</a> telah mempost di sosial media
                      </span>
                    </span>
                  </p>
                  <p className="backers-time">1 jam yang lalu</p>
                </li>
                <li>
                  <p className="backers-title">
                    <span className="text"><a href="/" target="_blank">@nelsonwijaya</a> telah mempost di Instagram</span>
                    <span className="tooltip">
                      <img src={IconVerified} alt="Terverfikasi" className="backers-verified" />
                      <span class="tooltiptext">
                        Kami sudah melakukan pengecekan bahwa <a href="/" target="_blank">@nelsonwijaya</a> telah mempost di sosial media
                      </span>
                    </span>
                  </p>
                  <p className="backers-time">2 jam yang lalu</p>
                </li>
                <li>
                  <p className="backers-title">
                    <span className="text">Anomim telah mempost di Instagram</span>
                    <span className="tooltip">
                      <img src={IconVerified} alt="Terverfikasi" className="backers-verified" />
                      <span class="tooltiptext">
                        Kami sudah melakukan pengecekan bahwa akun telah mempost di sosial media
                      </span>
                    </span>
                  </p>
                  <p className="backers-time">3 jam yang lalu</p>
                </li>
                <li>
                  <Loader height={12} borderRadius={8} marginBottom={8} />
                  <Loader width={200} height={12} borderRadius={8} />
                </li>
              </ul>
              <a href="/" className="btn-load">Muat lebih banyak</a>
            </Fragment>
        }
      </Fragment>
    )
  }
}

export default BusinessDetailBackers

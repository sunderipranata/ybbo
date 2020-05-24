import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Responsive from 'react-responsive'
import { INSTAGRAM_PATH } from '../../../routes'

import Loader from '../../../components/Loader'

const Desktop = props => <Responsive {...props} minWidth={768} />

class BusinessDetailForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    scrollToBackers: PropTypes.func
  }

  state = {
    isError: false,
    isAnonymous: false,
    isSuccess: false
  }

  handleCheckboxChange = event => this.setState({ isAnonymous: event.target.checked })

  render() {
    const { isError, isAnonymous, isSuccess } = this.state
    const { isLoading } = this.props

    return (
      <div className="bd-content__sidebar">
        { isLoading ?
        <Fragment>
          <Loader height={16} borderRadius={8} marginBottom={8} />
          <Loader height={12} borderRadius={8} marginBottom={16} />
          <Loader width={150} height={12} borderRadius={8} marginBottom={8} />
          <Loader height={32} borderRadius={8} marginBottom={8} />
          <Loader height={12} borderRadius={8} marginBottom={16} />
          <Loader height={32} borderRadius={8} />
        </Fragment>
        :
        <Fragment>
          { isSuccess ?
            <Fragment>
              <h2 className="bd-content__title">Terima kasih telah mendaftar</h2>
              <p className="desc">
                Akun kamu telah berhasil terdaftar{ isAnonymous && " dan akan ditampilkan sebagai anonim" }, Silakan tekan tombol di bawah untuk mendownload gambar/video.
              </p>
              <p className="desc" style={{marginTop: '8px'}}>
                Jangan lupa tag kami <a href={INSTAGRAM_PATH} target="_blank">@YukBantuBisnis.Online</a> agar akun Instagram kamu terverifikasi.
              </p>
              <button onClick={()=> window.open("https://www.google.com/", "_blank")} className="button button--main">Download aset untuk dipost</button>
            </Fragment>
            :
            <Fragment>
              <Desktop><h2 className="bd-content__title">Dukung [Nama Bisnis]</h2></Desktop>
              {/* <p className="desc">Belum ada pendukung nih. Yuk jadi yang pertama!</p> */}
              {/* <p className="desc">Baru ada <button className="btn-link" onClick={this.props.scrollToBackers}>50 Pendukung</button> nih. Yuk dukung [nama bisnis]!</p> */}
              <p className="desc">Sudah ada <button className="btn-link" onClick={this.props.scrollToBackers}>200 Pendukung</button>. Yuk jadi salah satunya!</p>
              <form className="form">
                <label className="label-input" for="account">Masukkan akun Instagram kamu</label>
                <input type="text" id="account" name="account" placeholder="Contoh: @instagram" />
                { isError && <p className="label-error">error messsage</p>}
                <label class="checkbox-container form__checkbox">Sembunyikan akun saya (pendukung anonim)
                  <input type="checkbox" checked={isAnonymous}  onChange={this.handleCheckboxChange} />
                  <span class="checkmark" />
                </label>
                { isAnonymous ?
                  <div className="notes form__notes">
                    Kontribusi kamu akan kami catat sebagai anonim di daftar pendukung [Nama Bisnis].
                  </div>
                :
                  <div className="notes form__notes">
                    Akun Instagram kamu akan tercantum di daftar pendukung [Nama Bisnis].
                  </div>
                }
                {/* if input name is not filled button--disabled, if input name is filled button--main, if post form loading state spinner */}
                <button className="button button--disabled" type="submit">Daftar untuk download aset</button>
                {/* <button className="button button--main" type="submit">Daftar untuk download aset</button> */}
                {/* <button className="button button--main" type="submit"> <span class="loadingSpinner" /></button> */}
              </form>
            </Fragment>
          }
        </Fragment>
        }
      </div>
    )
  }
}

export default BusinessDetailForm

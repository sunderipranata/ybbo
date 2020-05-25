import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Responsive from 'react-responsive'
import { INSTAGRAM_PATH } from '../../../routes'

import Loader from '../../../components/Loader'
import BusinessService from '../../../services/BusinessService'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const ERROR_MESSAGE_DUPLICATE_ENTRY = (id) => `Akun dengan id ${id} sudah mendukung bisnis ini. Hayoh salah ketik ya ?`
const ERROR_MESSAGE_NOT_VALID = "Akun yang dimasukkan tidak valid, Hayoh coba dicek lagi !"
const ERROR_MESSAGE_GENERAL = "Terjadi kesalahan pada sistem kami, mohon coba lagi dalam beberapa detik"

class BusinessDetailForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    scrollToBackers: PropTypes.func,
    businessName: PropTypes.string,
    businessId: PropTypes.string,
    backersCount: PropTypes.number,
    assetsUrl: PropTypes.string
  }

  state = {
    errorMessage : "",
    isError: false,
    isAnonymous: false,
    socialMediaAccount: "",
    isSuccess: false
  }


  handleCheckboxChange = event => this.setState({ isAnonymous: event.target.checked })

  handleSocialMediaAccountInputChange = event => this.setState({socialMediaAccount: event.target.value})

  submitBusinessDetailForm = (businessId,socialMediaAccount,isAnonymous) => {
    BusinessService.submitBusinessDetailForm(businessId,socialMediaAccount,isAnonymous, (res) => {
      this.setState({isSuccess: true})
    },
    (errorResponse) => {
      this.handleErrorResponse(errorResponse)
      this.setState({isError: true})
    })
  }

  handleErrorResponse = (errorResponse) => {
    try{
      switch(errorResponse.meta.error_code){
        case 1003: this.setState({errorMessage:ERROR_MESSAGE_NOT_VALID});break;
        case 1004: this.setState({errorMessage:ERROR_MESSAGE_DUPLICATE_ENTRY(this.state.socialMediaAccount)});break;
        default: this.setState({errorMessage: ERROR_MESSAGE_GENERAL})
      }
    }
    catch(reason){
      this.setState({errorMessage: ERROR_MESSAGE_GENERAL})
    }
  }

  handleSubmitForm = event => {
    this.submitBusinessDetailForm(
      this.props.businessId,
      this.state.socialMediaAccount,
      this.state.isAnonymous
    )
  }

  render() {
    const { isError, isAnonymous, isSuccess,socialMediaAccount, errorMessage } = this.state
    const { isLoading, businessName ,numberOfBackers, assetsUrl } = this.props

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
                Jangan lupa tag kami <a href={INSTAGRAM_PATH} target="_blank" rel="noopener noreferrer">@YukBantuBisnis.Online</a> agar akun Instagram kamu terverifikasi.
              </p>
              <button onClick={()=> window.open(assetsUrl, "_blank")} className="button button--main">Download aset untuk dipost</button>
            </Fragment>
            :
            <Fragment>
              <Desktop><h2 className="bd-content__title">Dukung {businessName}</h2></Desktop>
              { numberOfBackers > 0 ?
                <p className="desc">
                  <Desktop>Sudah ada <button className="btn-link" onClick={this.props.scrollToBackers}>{numberOfBackers} Pendukung</button>.</Desktop>{' '}
                  <Mobile>Sudah ada {numberOfBackers} Pendukung.</Mobile>{' '}
                  Yuk jadi salah satunya!
                </p>
              :
                <p className="desc">
                  Yuk dukung {businessName}
                </p>
              }
              <form className="form">
                <label className="label-input" for="account">Masukkan akun Instagram kamu</label>
                <input type="text" id="account" name="account" value={socialMediaAccount} onChange={this.handleSocialMediaAccountInputChange} placeholder="Contoh: @instagram" />
          { isError && <p className="label-error">{errorMessage}</p>}
                <label class="checkbox-container form__checkbox">Sembunyikan akun saya (pendukung anonim)
                  <input type="checkbox" checked={isAnonymous}  onChange={this.handleCheckboxChange} />
                  <span class="checkmark" />
                </label>
                { isAnonymous ?
                  <div className="notes form__notes">
                    Kontribusi kamu akan kami catat sebagai anonim di daftar pendukung {businessName}.
                  </div>
                :
                  <div className="notes form__notes">
                    Akun Instagram kamu akan tercantum di daftar pendukung {businessName}.
                  </div>
                }
                {/* if input name is not filled button--disabled, if input name is filled button--main, if post form loading state spinner */}
                <input type="button" className={socialMediaAccount === "" ? "button button--disabled":"button button--main"}
                disabled={socialMediaAccount === ""} value="Daftar untuk download aset" onClick={this.handleSubmitForm}></input>
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

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Responsive from 'react-responsive'
import { INSTAGRAM_PATH } from '../../../routes'

import Loader from '../../../components/Loader'
import BusinessService from '../../../services/BusinessService'

import BaseAnalyticsComponents from "../../../utils/googleAnalytics/BaseAnalyticsComponent"
import EventLabel from "../../../utils/googleAnalytics/EventLabel"

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const ERROR_MESSAGE_NOT_VALID = "Akun yang dimasukkan tidak valid. Hayoh coba dicek lagi!"
const ERROR_MESSAGE_GENERAL = "Terjadi kesalahan pada sistem kami, mohon coba lagi dalam beberapa detik"

class BusinessDetailForm extends BaseAnalyticsComponents {
  static propTypes = {
    isLoading: PropTypes.bool,
    scrollToBackers: PropTypes.func,
    scrollToGallery: PropTypes.func,
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
    isSuccess: false,
    isDuplicate: false
  }


  handleCheckboxChange = event => {
    this.trackClickWithValue(EventLabel.MAKE_ME_ANONYMOUS_CHECKBOX,`${event.target.checked} - ${this.props.businessName}`)
    this.setState({ isAnonymous: event.target.checked })
  }

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
        case 1004: this.setState({isDuplicate: true});break;
        default: this.setState({errorMessage: ERROR_MESSAGE_GENERAL})
      }
    }
    catch(reason){
      this.setState({errorMessage: ERROR_MESSAGE_GENERAL})
    }
  }

  handleSubmitForm = event => {
    this.trackClickWithValue(EventLabel.SUBMIT_BUSINESS_DETAIL_FORM_BUTTON,this.props.businessName)
    this.submitBusinessDetailForm(
      this.props.businessId,
      this.state.socialMediaAccount,
      this.state.isAnonymous
    )
  }

  handleOnDownloadAssetButtonClick = () => {
    this.trackClickWithValue(EventLabel.DOWNLOAD_ASSET_BUTTON,this.props.businessName)
    window.open(this.props.assetsUrl, "_blank")
  }

  render() {
    const { isError, isAnonymous, isSuccess, socialMediaAccount, errorMessage, isDuplicate } = this.state
    const { isLoading, businessName ,numberOfBackers} = this.props

    return (
      <div className="bd-content__sidebar">
        { isLoading ?
        <Fragment>
          <Loader height={16} borderRadius={8} marginBottom={8} />
          <Loader height={12} borderRadius={8} marginBottom={8} />
          <Loader height={12} borderRadius={8} marginBottom={16} />
          <Loader width={150} height={12} borderRadius={8} marginBottom={8} />
          <Loader height={32} borderRadius={8} marginBottom={8} />
          <Loader height={12} borderRadius={8} marginBottom={16} />
          <Loader width={150} height={12} borderRadius={8} marginBottom={8} />
          <Loader height={80} borderRadius={8} marginBottom={8} />
          <Loader height={32} borderRadius={8} marginBottom={8} />
          <Loader height={32} borderRadius={8} />
        </Fragment>
        :
        <Fragment>
          { isSuccess ?
            <Fragment>
              <h2 className="bd-content__title">Terima kasih telah membagikan pengalamanmu</h2>
              <p className="desc">
                Akunmu ({socialMediaAccount}) dan komentarmu telah berhasil kami masukkan. { isAnonymous && " Akunmu akan ditampilkan sebagai anonim." }{' '}
              </p>
              <p className="desc" style={{marginTop: '8px'}}>
                Kamu juga bisa share produk {businessName} di Instagram Story dengan klik tombol di bawah untuk download gambar/video.
              </p>
              <p className="desc" style={{marginTop: '8px'}}>
                Jangan lupa tag instagram kami <a href={INSTAGRAM_PATH} target="_blank" rel="noopener noreferrer">@YukBantuBisnis.Online</a> ya!
              </p>
              <button onClick={this.handleOnDownloadAssetButtonClick} className="button button--main">Download aset untuk dipost</button>
            </Fragment>
            :
            isDuplicate ?
            <Fragment>
              <h2 className="bd-content__title">Kamu sudah pernah membagikan pengalamanmu</h2>
              <p className="desc">
                Akun dengan id {socialMediaAccount} sudah pernah membagikan pengalaman. Terima kasih telah  membagikan pengalamanmu!{' '}
              </p>
              <p className="desc" style={{marginTop: '8px'}}>
                Kamu juga bisa share produk {businessName} di Instagram Story dengan klik tombol di bawah untuk download gambar/video.
              </p>
              <p className="desc" style={{marginTop: '8px'}}>
                Jangan lupa tag instagram kami <a href={INSTAGRAM_PATH} target="_blank" rel="noopener noreferrer">@YukBantuBisnis.Online</a> ya!
              </p>
              <button onClick={this.handleOnDownloadAssetButtonClick} className="button button--main">Download aset untuk dipost</button>
            </Fragment>
            :
            <Fragment>
              <Desktop><h2 className="bd-content__title">Dukung {businessName}</h2></Desktop>
              { numberOfBackers > 0 ?
                <p className="desc">
                  <Desktop>Sudah ada <button className="btn-link" onClick={this.props.scrollToBackers}>{numberOfBackers} Pendukung</button>.</Desktop>{' '}
                  <Mobile>Sudah ada {numberOfBackers} Pendukung.</Mobile>{' '}
                  Yuk jadi salah satunya dengan menceritakan pengalamanmu atau <button className="link link--button" onClick={this.handleOnDownloadAssetButtonClick}>download aset</button> untuk dipost di Instagram Story.
                </p>
              :
                <p className="desc">
                  Yuk dukung {businessName} dengan menceritakan pengalamanmu atau <button className="link link--button" onClick={this.handleOnDownloadAssetButtonClick}>download aset</button> untuk dipost di Instagram Story.
                </p>
              }
              <form className="form">
                <section className="form-section">
                  <label className="label-input" for="account">Akun Instagram Kamu</label>
                  <input type="text" id="account" name="account" value={socialMediaAccount} onChange={this.handleSocialMediaAccountInputChange} placeholder="Contoh: @yukbantubisnis.online" />
                  <label class="checkbox-container form__checkbox">Sembunyikan akun saya
                    <input type="checkbox" checked={isAnonymous}  onChange={this.handleCheckboxChange} />
                    <span class="checkmark" />
                  </label>
                </section>
                <section className="form-section">
                  <label className="label-input" for="review">Ceritakan Pengalamanmu</label>
                  <textarea style={{resize: "none"}} rows="4" id="review" name="review" placeholder="Contoh: suka banget sama produknya, next bakal pesan lagi" />
                  { isError && <p className="label-error">{errorMessage}</p>}
                </section>
                { isAnonymous ?
                  <div className="notes form__notes">
                    Komentarmu akan kami catat sebagai anonim di daftar pendukung {businessName}.
                  </div>
                :
                  <div className="notes form__notes">
                    Akun Instagram dan komentarmu akan tercantum di daftar pendukung {businessName}.
                  </div>
                }
                {/* if input name is not filled button--disabled, if input name is filled button--main, if post form loading state spinner */}
                <input type="button" className={socialMediaAccount === "" ? "button button--disabled":"button button--main"}
                disabled={socialMediaAccount === ""} value="Kirim Ceritamu" onClick={this.handleSubmitForm}></input>
                {/* <button className="button button--main" type="submit">Kirim Ceritamu</button> */}
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

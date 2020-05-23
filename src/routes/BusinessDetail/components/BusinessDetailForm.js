import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Responsive from 'react-responsive'

import Loader from '../../../components/Loader'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

class BusinessDetailForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    scrollToBackers: PropTypes.func
  }

  state = {
    isError: false,
    isAnonymous: false
  }

  handleCheckboxChange = event => this.setState({ isAnonymous: event.target.checked })

  render() {
    const { isError, isAnonymous } = this.state
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
          <Desktop><h2 className="bd-content__title">Dukung [Nama Bisnis]</h2></Desktop>
          {/* <p className="desc">Belum ada pendukung nih. Yuk jadi yang pertama!</p> */}
          {/* <p className="desc">Baru ada <button className="btn-link" onClick={this.props.scrollToBackers}>50 Pendukung</button> nih. Yuk dukung [nama bisnis]!</p> */}
          <p className="desc">Sudah ada <button className="btn-link" onClick={this.props.scrollToBackers}>200 Pendukung</button>. Yuk jadi salah satunya!</p>
          <form className="form">
            <label className="label-input" for="account">Masukkan Akun Sosial Media mu</label>
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
                Akun sosial media mu akan tercantum di daftar pendukung [Nama Bisnis].
              </div>
            }
            <input className="button button--disabled" type="submit" value="Download aset untuk dipost" />
            {/* <input className="button button--main" type="submit" value="Download aset untuk dipost" /> */}
          </form>
        </Fragment>
        }
      </div>
    )
  }
}

export default BusinessDetailForm

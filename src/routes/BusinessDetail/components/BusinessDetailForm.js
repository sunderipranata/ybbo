import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../../components/Loader'

class BusinessDetailForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    scrollToMyRef: PropTypes.func
  }

  render() {
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
          <h2 className="bd-content__title">Dukung [Nama Bisnis]</h2>
          {/* <p className="desc">Belum ada pendukung nih. Yuk jadi yang pertama!</p>
          <p className="desc">Baru ada <a href="/">50 Pendukung</a> nih. Yuk dukung [nama bisnis]!</p> */}
          <p className="desc">Sudah ada <a onClick={this.props.scrollToMyRef}>200 Pendukung</a>. Yuk jadi salah satunya!</p>
          <form className="form">
            <label className="label-input" for="account">Masukkan Akun Sosial Media mu</label>
            <input type="text" id="account" name="account" placeholder="Contoh: @instagram" />
            <label class="checkbox-container form__checkbox">Sembunyikan akun saya (pendukung anonim)
              <input type="checkbox" />
              <span class="checkmark" />
            </label>
            <input className="button button--disabled form__btn" type="submit" value="Download aset untuk dipost" />
            {/* <input className="button button--main form__btn" type="submit" value="Download aset untuk dipost" /> */}
          </form>
        </Fragment>
        }
      </div>
    )
  }
}

export default BusinessDetailForm

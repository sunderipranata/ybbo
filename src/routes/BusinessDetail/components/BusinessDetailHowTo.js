import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import StepCard from '../../../components/StepCard/StepCard'
import Loader from '../../../components/Loader'

class BusinessDetailHowTo extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string
  }

  render() {
    const { isLoading, title } = this.props

    return (
      <Fragment>
        <h2 className="bd-content__title bd-content__title--padding">Cara Mendukung {title}</h2>
        { isLoading ?
          <ul className="bd-content__gallery">
            <li style={{ width: "30%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
            <li style={{ width: "30%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
            <li style={{ width: "30%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
          </ul>
          :
          <ul className="bd-content__step">
            <li className="step-list">
              <StepCard index="1" title="Download Aset" desc="Download gambar atau video dengan memasukkan akun sosial media mu." />
            </li>
            <li className="step-list">
              <StepCard index="2" title="Promosikan di Sosial Media" desc="Post gambar atau video yang sudah kamu download dan tag kami @YukBantuBisnis.Online" />
            </li>
            <li className="step-list">
              <StepCard index="3" title="Selesai" desc={"Akun mu akan tercantum di daftar pendukung " + title  +". Terima kasih atas kotribusi mu."} />
            </li>
          </ul>
      }
      </Fragment>
    )
  }
}

export default BusinessDetailHowTo

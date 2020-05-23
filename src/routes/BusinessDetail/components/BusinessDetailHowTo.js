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
              <StepCard index="1" title="Order atau Download" desc={"Order langsung produk dari " + title + "  atau download saja asetnya."} />
            </li>
            <li className="step-list">
              <StepCard index="2" title="Post & Tag Kami di Instagram" desc="Post gambar/video hasil orderan kamu atau media yang telah kamu download. Jangan lupa tambahkan testimoni dan tag @YukBantuBisnis.Online ya! :)" />
            </li>
            <li className="step-list">
              <StepCard index="3" title="Jadi Pendukung Terverifikasi" desc={"Akun kamu akan tercatat sebagai akun terverifikasi dan testimoni kamu akan ditampilkan. Terima kasih atas kotribusi mu."} />
            </li>
          </ul>
      }
      </Fragment>
    )
  }
}

export default BusinessDetailHowTo

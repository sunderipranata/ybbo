import React, { Component } from 'react'
import Responsive from 'react-responsive'

import Logo from '../../../assets/logo-ybbo.png'

const Mobile = props => <Responsive {...props} maxWidth={767} />

class Hero extends Component {
  render() {
    return (
      <section className="home__hero">
        <div className="title">
          <Mobile>
            <img src={Logo} className="hero__logo" alt="Logo Yuk Bantu Bisnis Online" />	
          </Mobile>
          <h1 className="hero__title">Yuk Bantu Bisnis Online</h1>
        </div>
        <p className="hero__desc">Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia.</p>
      </section>
    );
  }
}

export default Hero
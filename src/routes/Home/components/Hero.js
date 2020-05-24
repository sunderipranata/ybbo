import React, { Component } from 'react'

class Hero extends Component {
  render() {
    return (
      <section className="home__hero">
        <div className="title">
          <h1 className="hero__title">Yuk Bantu Bisnis Online</h1>
        </div>
        <p className="hero__desc">Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia.</p>
      </section>
    );
  }
}

export default Hero
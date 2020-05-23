import React, { Component } from 'react'

import Logo from '../assets/logo-ybbo.png'

class Hero extends Component {
  render() {
    return (
      <section className="home__hero">
        <div className="title">
          <img src={Logo} className="hero__logo" alt="Logo Yuk Bantu Bisnis Online" />
          <h1 className="hero__title">Yuk Bantu Bisnis Online</h1>
        </div>
        <p className="hero__desc">Bersama kita jaga ekonomi Indonesia dengan membantu bisnis online</p>
      </section>
    );
  }
}

export default Hero
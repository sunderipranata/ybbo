import React, { Component } from 'react';
import BusinessCard from '../../../components/BusinessCard'

import { BUSINESS_LIST_PATH } from '../../../routes'

class BusinessFeatured extends Component {
  render() {
    return (
      <section className="home__business">
        <h2 className="business__title">Featured Bisnis</h2>
        <div className="business__content">
          <a className="item">
            <BusinessCard loading />
          </a>
          <a className="item">
            <BusinessCard loading />
          </a>
          <a className="item">
            <BusinessCard loading />
          </a>
          <a className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Bali" category="Hobi" backers={20} />
          </a>
          <a className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
          <a className="item">
            <BusinessCard img="https://via.placeholder.com/1600x960" title="Nama Bisnis" location="Jakarta" category="Makanan & Minuman" backers={0} />
          </a>
        </div>
        <div className="business__load">
          <a className="button button--main" href={BUSINESS_LIST_PATH}>
            Lihat Semua
          </a>
        </div>
      </section>
    )
  }
}

export default BusinessFeatured
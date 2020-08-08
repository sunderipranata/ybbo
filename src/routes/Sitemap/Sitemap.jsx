import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Helmet } from 'react-helmet'

import './Sitemap.scss'

import PageLabel from "../../utils/googleAnalytics/PageLabel"

library.add(fab)

class Sitemap extends Component {
  componentDidMount() {
    window.scrollTo({top: 0})
  }

  renderHelmet = () => {
    const title = "Sitemap | Yuk Bantu Bisnis Online"
    const description = "Bersama kita bantu ekonomi Indonesia dengan mempromosikan UMKM di tengah pandemi COVID-19. #BanggaBuatanIndonesia"
    return (
      <Helmet>
        <title>{ title }</title>
        <meta name = "title" content = { title }/>
        <meta name = "description" 
          content = { description }
        />
      </Helmet>
    )
  }
  
  render() {
    return (
      <Fragment>
        { this.renderHelmet() }
        <article>
        <Header pageLabel={PageLabel.HEADER}/>
        <main className="container container__about clearfix">
          <h1 className="title">Sitemap</h1>
          <p className="desc">
            Kami tim Software Engineers yang mencoba untuk membantu UMKM Indonesia melalui teknologi.{' '}
            Inovasi ini ditujukan untuk membantu ekonomi yang sedang melambat karena pandemi COVID-19.
          </p>
          <p className="desc">
            Platform ini menyediakan layanan gratis bagi pebisnis untuk <b><i>crowd-endorsing</i></b>.{' '}
            Berharap kepada pengguna yang baik hati untuk membantu mempromosikannya dengan mudah.{' '}
          </p>
          <p className="desc">
            Melalui platform YukBantuBisnis.Online, siapapun dapat membantu UMKM secara cuma-cuma dan tidak memakan biaya.{' '}
            Harapannya, bisnis-bisnis dapat bertahan dan menciptakan efek domino yang baik bagi karyawan serta ekonomi Indonesia.
          </p>
        </main>
        <Footer pageLabel={PageLabel.FOOTER} />
        </article>
      </Fragment>
    )
  }
}

export default Sitemap
import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Helmet } from 'react-helmet'

import './About.scss'

import Devin from './assets/devin.jpeg'
import Nelson from './assets/nelson.jpeg'
import Sunderi from './assets/sunderi.jpeg'
import Sylvie from './assets/sylvie.jpeg'

import PageLabel from "../../utils/googleAnalytics/PageLabel"

library.add(fab)

class About extends Component {
  componentDidMount() {
    window.scrollTo({top: 0})
  }

  renderHelmet = () => {
    const title = "About Us | Yuk Bantu Bisnis Online"
    const description = "Kami tim Software Engineers yang mencoba untuk membantu UMKM Indonesia melalui teknologi. Inovasi ini ditujukan untuk membantu ekonomi yang sedang melambat karena pandemi COVID-19." + 
    "Platform ini menyediakan layanan gratis bagi pebisnis untuk crowd-endorsing. Berharap kepada pengguna yang baik hati untuk membantu mempromosikannya dengan mudah."

    return (
      <Helmet>
        <title>{ title }</title>
        <meta name = "title" content = { title }/>
        <meta name = "description" 
          content = { description }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yukbantubisnis.online/tentang-kami" />
        <meta property="og:title" content="Yuk Bantu Bisnis Online" />
        <meta property="og:description" content= { description } />
        <meta property="og:image" content="https://i.ibb.co/1Lp3TXp/og-ybbo.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yukbantubisnis.online/tentang-kami" />
        <meta property="twitter:title" content="Yuk Bantu Bisnis Online" />
        <meta property="twitter:description" content= { description } />
        <meta property="twitter:image" content="https://i.ibb.co/1Lp3TXp/og-ybbo.jpgg" />
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
          <h1 className="title">Hai! Salam Kenal <span role="img" aria-label="Waving Hand">👋</span> </h1>
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
          <ul className="team-container">
            <li>
              <a href="https://www.linkedin.com/in/devinryanriota/" target="_blank" rel="noopener noreferrer"><div className="team-avatar" style={{ "backgroundImage": 'url(' + Devin + ')' }}  /></a>
              <p>Devin <a href="https://www.linkedin.com/in/devinryanriota/" className="linkedin" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']}  size="lg" /></a></p>
              <p>Fullstack Engineer</p>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/nelson-wijaya/" target="_blank" rel="noopener noreferrer"><div className="team-avatar" style={{ "backgroundImage": 'url(' + Nelson + ')' }}  /></a>
              <p>Nelson <a href="https://www.linkedin.com/in/nelson-wijaya/" className="linkedin" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']}  size="lg" /></a></p>
              <p>Data & Front-end Engineer</p>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sunderi-pranata/" target="_blank" rel="noopener noreferrer"><div className="team-avatar" style={{ "backgroundImage": 'url(' + Sunderi + ')' }}  /></a>
              <p>Sunderi <a href="https://www.linkedin.com/in/sunderi-pranata/" className="linkedin" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']}  size="lg" /></a></p>
              <p>Product & Software Engineer</p>
            </li>
            <li>
              <a href="https://www.sylviestephanie.com/" target="_blank" rel="noopener noreferrer"><div className="team-avatar" style={{ "backgroundImage": 'url(' + Sylvie + ')' }}  /></a>
              <p>Sylvie <a href="https://www.linkedin.com/in/sylviestephanie/" className="linkedin" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']}  size="lg" /></a></p>
              <p>UI/UX & Front-end Designer</p>
            </li>
          </ul>
        </main>
        <Footer pageLabel={PageLabel.FOOTER} />
        </article>
      </Fragment>
    )
  }
}

export default About

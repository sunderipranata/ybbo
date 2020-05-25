import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

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
  
  render() {
    return (
      <Fragment>
        <article>
        <Header pageLabel={PageLabel.HEADER}/>
        <main className="container container__about clearfix">
          <h1 className="title">Hai! Salam Kenal <span role="img" aria-label="Waving Hand">👋</span> </h1>
          <p className="desc">
            Tim software engineers dari Indonesia yang mencoba untuk membantu ekonomi Indonesia yang melambat karena pandemi COVID-19.
          </p>
          <p className="desc">
            Kami percaya bahwa promosi melalui koneksi sosial media itu lebih menarik perhatian karena lebih personal.{' '}
            Harapan kami dengan adanya platform ini, bisnis online seperti penjual kue lapis, pemilik toko baju, maupun pengrajin kerajinan tangan{' '}
            dapat mempromosikan produknya secara gratis sehingga bisnis mereka dapat bertahan dan menciptakan efek domino ke karyawan-karyawannya{' '}
            dan ekonomi Indonesia.
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

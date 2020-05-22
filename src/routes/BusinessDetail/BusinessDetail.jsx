import React, { Component, Fragment } from 'react'

import Responsive from 'react-responsive'
import SimpleReactLightbox from 'simple-react-lightbox'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BusinessDetailIntro from './components/BusinessDetailIntro'
import BusinessDetailAbout from './components/BusinessDetailAbout'
import BusinessDetailHowTo from './components/BusinessDetailHowTo'
import BusinessDetailGallery from './components/BusinessDetailGallery'
import BusinessDetailBackers from './components/BusinessDetailBackers'
import BusinessDetailForm from './components/BusinessDetailForm'

import './BusinessDetail.scss'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

class BusinessDetail extends Component {
  constructor(props) {
    super(props)
    this.section = React.createRef();

    this.state = {
      isLoading: false
    }
  }

  scrollToMyRef = () => window.scrollTo({behavior: 'smooth', top: this.myRef.offsetTop - 100})

  render() {
    const { isLoading } = this.state

    return (
      <Fragment>
        <Desktop>
          <Header />
          { isLoading ?
            <main className="container clearfix">
              <div className="content__main">
                <section name="Pengantar Bisnis">
                  <BusinessDetailIntro isLoading />
                </section>
                <section name="Tentang Bisnis" className="bd-card">
                  <div className="bd-card__content">
                    <BusinessDetailAbout isLoading />
                  </div>
                </section>
                <section name="Cara Mendukung" className="bd-card">
                  <BusinessDetailHowTo isLoading />
                </section>
                <section name="Galeri" className="bd-card">
                  <BusinessDetailGallery isLoading />
                </section>
                <section name="Pendukung" className="bd-card">
                  <div className="bd-card__content">
                    <BusinessDetailBackers isLoading  />
                  </div>
                </section>
              </div>
              <div className="content__sidebar">
                <BusinessDetailForm isLoading />
              </div>
            </main>
            :
            <main className="container clearfix">
              <div className="content__main">
                <section name="Pengantar Bisnis">
                  <BusinessDetailIntro 
                    img="https://via.placeholder.com/120x120" 
                    title="Nama Bisnis" 
                    category="Kategori"
                    location="Lokasi" />
                </section>
                <section name="Tentang Bisnis" className="bd-card">
                  <div className="bd-card__content">
                    <BusinessDetailAbout
                      title="Nama Bisnis" 
                      desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                      when an unknown printer took a galley of type and scrambled it to make a type book."
                      instagram="sylviestephanies"
                      tokopedia="houseoforganix"
                    />
                  </div>
                </section>
                <section name="Cara Mendukung" className="bd-card clearfix">
                  <BusinessDetailHowTo title="Nama Bisnis"  />
                </section>
                <section name="Galeri" className="bd-card">
                  <SimpleReactLightbox>
                    <BusinessDetailGallery />
                  </SimpleReactLightbox>
                </section>
                <section ref={ (ref) => this.myRef=ref } name="Pendukung" className="bd-card">
                  <div className="bd-card__content">
                    <BusinessDetailBackers title="Nama Bisnis"  />
                  </div>
                </section>
              </div>
              <div className="content__sidebar">
                <BusinessDetailForm scrollToMyRef={this.scrollToMyRef} />
              </div>
            </main>
          }
          <Footer />
        </Desktop>
        <Mobile>
          <SimpleReactLightbox>
            <BusinessDetailGallery />
          </SimpleReactLightbox>
        </Mobile>
      </Fragment>
    )
  }
}

export default BusinessDetail
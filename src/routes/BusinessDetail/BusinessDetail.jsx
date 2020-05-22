import React, { Component, Fragment } from 'react'

import Responsive from 'react-responsive'
import SimpleReactLightbox from 'simple-react-lightbox'
import ClassNames from 'classnames'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import BottomSheet from '../../components/BottomSheet'

import BusinessDetailIntro from './components/BusinessDetailIntro'
import BusinessDetailAbout from './components/BusinessDetailAbout'
import BusinessDetailHowTo from './components/BusinessDetailHowTo'
import BusinessDetailGallery from './components/BusinessDetailGallery'
import BusinessDetailBackers from './components/BusinessDetailBackers'
import BusinessDetailForm from './components/BusinessDetailForm'

import './BusinessDetail.scss'
import Recomendations from './components/Recomendations'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

class BusinessDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      showForm: false
    }
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  scrollToBackers = () => window.scrollTo({behavior: 'smooth', top: this.backersRef.offsetTop - 100})

  render() {
    const { isLoading, showForm } = this.state

    return (
      <Fragment>
        <Desktop>
          <Header />
          { isLoading ?
            <Fragment>
              <main className="container container__business clearfix">
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
              <Recomendations isLoading />
            </Fragment>
            :
            <Fragment>
              <main className="container container__business clearfix">
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
                  <section ref={ (ref) => this.backersRef=ref } name="Pendukung" className="bd-card">
                    <div className="bd-card__content">
                      <BusinessDetailBackers title="Nama Bisnis"  />
                    </div>
                  </section>
                </div>
                <div className="content__sidebar">
                  <BusinessDetailForm scrollToBackers={this.scrollToBackers} />
                </div>
              </main>
              <Recomendations />
            </Fragment>
          }
          <Footer />
        </Desktop>
        <Mobile>
          <Navbar title="Detail Bisnis" />
          { isLoading ?
            <Fragment>
              <main className="container--mobile">
                <section name="Pengantar Bisnis" className="bd-card__content">
                  <BusinessDetailIntro isLoading />
                </section>
                <section name="Tentang Bisnis" className="bd-card__content">
                  <BusinessDetailAbout isLoading />
                </section>
                <hr className="divider" />
                <section name="Cara Mendukung">
                  <BusinessDetailHowTo isLoading  />
                </section>
                <hr className="divider" />
                <section name="Galeri">
                  <BusinessDetailGallery isLoading />
                </section>
                <hr className="divider" />
                <section name="Pendukung" className="bd-card__content" style={{ marginBottom: '72px' }}>
                  <BusinessDetailBackers isLoading />
                </section>
              </main>
            </Fragment>
            :
            <Fragment>
              <main className="container--mobile">
                <section name="Pengantar Bisnis" className="bd-card__content">
                  <BusinessDetailIntro 
                    img="https://via.placeholder.com/120x120" 
                    title="Nama Bisnis" 
                    category="Kategori"
                    location="Lokasi" />
                </section>
                <section name="Tentang Bisnis" className="bd-card__content">
                  <BusinessDetailAbout
                    title="Nama Bisnis" 
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type book."
                    instagram="sylviestephanies"
                    tokopedia="houseoforganix"
                  />
                </section>
                <hr className="divider" />
                <section name="Cara Mendukung">
                  <BusinessDetailHowTo title="Nama Bisnis"  />
                </section>
                <hr className="divider" />
                <section name="Galeri">
                  <SimpleReactLightbox>
                    <BusinessDetailGallery />
                  </SimpleReactLightbox>
                </section>
                <hr className="divider" />
                <section name="Pendukung" className="bd-card__content" style={{ marginBottom: '72px' }}>
                  <BusinessDetailBackers title="Nama Bisnis"  />
                </section>
              </main>
              <div className="bd-bottom">
                <div className="bd-bottom__content">
                  <button className={ClassNames('button button--main')} onClick={this.toggleForm}>Dukung Nama Bisnis</button>
                </div>
              </div>
              <BottomSheet title="Dukung Nama Bisnis"
                onClose={this.toggleForm}
                display={showForm}
              >
                <div className="bd-bottom__form">
                <BusinessDetailForm />
                </div>
              </BottomSheet>
            </Fragment>
          }
        </Mobile>
      </Fragment>
    )
  }
}

export default BusinessDetail
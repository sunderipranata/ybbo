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

import BusinessService from '../../services/BusinessService'

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

  componentDidMount() {
    window.scrollTo({top: 0})
    this.fetchBusinessDetail('5ec8e9ef6ed16727ee5082cd', () => {})
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  scrollToBackers = () => window.scrollTo({behavior: 'smooth', top: this.backersRef.offsetTop - 100})

  fetchBusinessDetail = (id, callback) => {
    BusinessService.getDetail(id, (res) => {
      console.log('resss', res)
      if(res !== null && res.data.meta.http_status === 200) {
        console.log('parse business detail', this.parseBusinessDetail(res.data))
        callback(this.parseBusinessDetail(res.data))
      }

      callback(null)
    })
  }

  parseBusinessDetail = (data) => {
    const detail = data.data
    const attributes = detail.attributes

    return {
      id: detail.id,
      name: attributes.name,
      location: attributes.location,
      category: attributes.category,
      description: attributes.description,
      instructions: attributes.instructions,
      iconUrl: attributes.icon_url,
      thumbnailUrl: attributes.thumbnail_url,
      assetsUrl: attributes.assets_url,
      picturesUrl: attributes.pictures_rl,
      backersCount: attributes.backers_count
    }
  }

  renderLoadingDesktop = () => {
    return (
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
    )
  }

  renderLoadingMobile = () => {
    return (
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
    )
  }

  renderDetailDesktop = () => {
    return (
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
    )
  }

  renderDetailMobile = () => {
    const { showForm } = this.state

    return (
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
    ) 
  }

  render = () => {
    const { isLoading } = this.state

    return (
      <Fragment>
        <Desktop>
          <Header />
          { isLoading ? this.renderLoadingDesktop() : this.renderDetailDesktop() }
          <Footer />
        </Desktop>
        <Mobile>
          <Navbar title="Detail Bisnis" />
          { isLoading ? this.renderLoadingMobile() : this.renderDetailMobile() }
        </Mobile>
      </Fragment>
    )
  }
}

export default BusinessDetail
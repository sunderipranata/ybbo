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

const categories = {
  food_and_beverage: 'Makanan dan Minuman',
  fashion: 'Fashion',
  hobby: 'Hobi',
  beauty: 'Kecantikan'
}

class BusinessDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      showForm: false,
      businessDetail: {}
    }
  }

  componentWillMount = () => {
    this.toggleLoading(true)
  }

  componentDidMount = () => {
    window.scrollTo({top: 0})

    const id = this.props.match.params.id
    this.fetchBusinessDetail(id, (response) => {
      this.setState({
        businessDetail: response
      }, function() {
        this.toggleLoading(false)
      })
    })
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  toggleLoading = (loading) => {
    this.setState({
      isLoading: loading
    })
  }

  scrollToBackers = () => window.scrollTo({behavior: 'smooth', top: this.backersRef.offsetTop - 100})

  fetchBusinessDetail = (id, callback) => {
    BusinessService.getDetail(id, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        console.log('parse business detail', this.parseBusinessDetail(res.data))
        callback(this.parseBusinessDetail(res.data))
      } else {
        callback(null)
      }
    })
  }

  parseBusinessDetail = (data) => {
    const detail = data.data
    const attributes = detail.attributes
    const storeAccountsData = attributes.store_accounts.data
    const storeAccounts = {}
    storeAccountsData.forEach((acc) => {
      const type = acc.attributes.account_type
      const name = acc.attributes.name
      const url = acc.attributes.url

      storeAccounts[type] = {
        name: name,
        url: url
      }
    })

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
      picturesUrl: attributes.pictures_url,
      backersCount: attributes.backers_count,
      storeAccounts: storeAccounts
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
    const { businessDetail } = this.state

    return (
      <Fragment>
        <main className="container container__business clearfix">
          <div className="content__main">
            <section name="Pengantar Bisnis">
              <BusinessDetailIntro 
                img = { businessDetail.iconUrl }
                title = { businessDetail.name }
                category = { categories[businessDetail.category] }
                location = { businessDetail.location } />
            </section>
            <section name="Tentang Bisnis" className="bd-card">
              <div className="bd-card__content">
                <BusinessDetailAbout
                  title = { businessDetail.name } 
                  desc = { businessDetail.description } 
                  accounts = { businessDetail.storeAccounts }
                />
              </div>
            </section>
            <section name="Cara Mendukung" className="bd-card clearfix">
              <BusinessDetailHowTo title = { businessDetail.name }  />
            </section>
            <section name="Galeri" className="bd-card">
              <SimpleReactLightbox>
                <BusinessDetailGallery
                  pictures = { businessDetail.picturesUrl }
                />
              </SimpleReactLightbox>
            </section>
            <section ref={ (ref) => this.backersRef=ref } name="Pendukung" className="bd-card">
              <div className="bd-card__content">
                <BusinessDetailBackers title = { businessDetail.name }  />
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
    const { showForm, businessDetail } = this.state

    return (
      <Fragment>
        <main className="container--mobile">
          <section name="Pengantar Bisnis" className="bd-card__content">
            <BusinessDetailIntro 
              img = { businessDetail.iconUrl } 
              title= { businessDetail.name }
              category= { categories[businessDetail.category] }
              location= { businessDetail.location } />
          </section>
          <section name="Tentang Bisnis" className="bd-card__content">
            <BusinessDetailAbout
              title = { businessDetail.name } 
              desc = { businessDetail.description }
              accounts = { businessDetail.storeAccounts }
            />
          </section>
          <hr className="divider" />
          <section name="Cara Mendukung">
            <BusinessDetailHowTo title = { businessDetail.name }  />
          </section>
          <hr className="divider" />
          <section name="Galeri">
            <SimpleReactLightbox>
              <BusinessDetailGallery
                pictures = { businessDetail.picturesUrl }
              />
            </SimpleReactLightbox>
          </section>
          <hr className="divider" />
          <section name="Pendukung" className="bd-card__content" style={{ marginBottom: '72px' }}>
            <BusinessDetailBackers title = { businessDetail.name }  />
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
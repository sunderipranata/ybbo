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
import PageLabel from '../../utils/googleAnalytics/PageLabel'
import { HOME_PATH } from '../../routes'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const categories = {
  food_and_beverage: 'Makanan dan Minuman',
  fashion: 'Fashion',
  hobby: 'Hobi',
  beauty: 'Kecantikan',
  others: 'Lainnya'
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

    //slug
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

  fetchBackers = (id, limit, offset, callback) => {
    BusinessService.getBackers(id, limit, offset, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        callback(this.parseBackers(res))
      } else {
        callback(null)
      }
    })
  }

  parseBackers = (data) => {
    const backers = data.data.data
    const meta = data.data.meta
    const total = meta.total
    const backerDetails = []
    backers.forEach((val, idx) => {
      const id = val.id
      const accountType = val.attributes.account_type
      const comment = val.attributes.comment
      const username = val.attributes.username
      const isVerified = val.attributes.is_verified
      const createdAt = val.attributes.created_at

      backerDetails.push({
        id: id,
        accountType: accountType,
        comment: comment,
        username: username,
        isVerified: isVerified,
        createdAt: createdAt
      })
    })

    return {
      backerDetails: backerDetails,
      total: total
    }
  }

  fetchRandomBusiness = (category, random, callback) => {
    BusinessService.getRandom(category, random, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        callback(this.parseRandomBusiness(res.data))
      } else {
        callback(null)
      }
    })
  }

  parseRandomBusiness = (data) => {
    const businesses = data.data
    const randomBusinesses = []
    businesses.forEach((val) => {
      randomBusinesses.push({
        id: val.id,
        name: val.attributes.name,
        category: val.attributes.category,
        location: val.attributes.location,
        thumbnailUrl: val.attributes.thumbnail_url,
        backersCount: val.attributes.backers_count,
        slug: val.attributes.slug
      })
    })

    return randomBusinesses
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
                <BusinessDetailBackers isLoading/>
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
                  assetsUrl = { businessDetail.assetsUrl }
                />
              </SimpleReactLightbox>
            </section>
            <section ref={ (ref) => this.backersRef=ref } name="Pendukung" className="bd-card">
              <div className="bd-card__content">
                <BusinessDetailBackers
                  pageLabel = {PageLabel.BUSINESS_DETAIL_PAGE}
                  businessDetail = { businessDetail }
                  fetchData = { this.fetchBackers }
                />
              </div>
            </section>
          </div>
          <div className="content__sidebar">
            <BusinessDetailForm 
            businessId={businessDetail.id}
            pageLabel={PageLabel.BUSINESS_DETAIL_PAGE}
            scrollToBackers={this.scrollToBackers} 
            businessName={businessDetail.name}
            numberOfBackers={businessDetail.backersCount} 
            assetsUrl={businessDetail.assetsUrl}/>
          </div>
        </main>
        <Recomendations 
          pageLabel = {PageLabel.BUSINESS_DETAIL_PAGE}
          businessDetail = { businessDetail }
          fetchData = { this.fetchRandomBusiness }
        />
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
                assetsUrl = { businessDetail.assetsUrl }
              />
            </SimpleReactLightbox>
          </section>
          <hr className="divider" />
          <section name="Pendukung" className="bd-card__content" style={{ marginBottom: '72px' }}>
              <BusinessDetailBackers
                pageLabel = {PageLabel.BUSINESS_DETAIL_PAGE}
                businessDetail = { businessDetail }
                fetchData = { this.fetchBackers }
              />
          </section>
        </main>
        <div className="bd-bottom">
          <div className="bd-bottom__content">
            <button className={ClassNames('button button--main')} onClick={this.toggleForm}>Ceritakan Pengalamanmu</button>
          </div>
        </div>
        <BottomSheet title={ "Dukung " + businessDetail.name } 
          onClose={this.toggleForm}
          display={showForm}
        >
          <div className="bd-bottom__form">
          <BusinessDetailForm
            businessId={businessDetail.id}
            pageLabel={PageLabel.BUSINESS_DETAIL_PAGE}
            scrollToBackers={this.scrollToBackers} 
            businessName={businessDetail.name}
            numberOfBackers={businessDetail.backersCount}
            assetsUrl={businessDetail.assetsUrl} />
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
          <Header pageLabel={PageLabel.HEADER}/>
          { isLoading ? this.renderLoadingDesktop() : this.renderDetailDesktop() }
          <Footer pageLabel={PageLabel.FOOTER} />
        </Desktop>
        <Mobile>
          <Navbar title="Detail Bisnis" prevPath={HOME_PATH} />
          { isLoading ? this.renderLoadingMobile() : this.renderDetailMobile() }
        </Mobile>
      </Fragment>
    )
  }
}

export default BusinessDetail
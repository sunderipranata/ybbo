import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Helmet } from 'react-helmet'

import './Sitemap.scss'
import BusinessService from '../../services/BusinessService'

const LIMIT = 15

class Sitemap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      data: [],
      totalData: 0,
      totalPage: 0
    }
  }

  componentWillMount = () => {
    let page = this.props.match.params.page

    if(typeof page === 'undefined' || page === null) {
      page = 1
    }

    this.setState({
      page: page
    })
  }

  componentDidMount = () => {
    window.scrollTo({top: 0})

    let page = this.props.match.params.page
    //calculate skip
    const skip = parseInt(page - 1) * LIMIT
    this.fetchSitemapBusiness(LIMIT, skip, (response) => {
      if(response !== null) {
        this.setState({
          data: response
        })
      }
    })
  }

  fetchSitemapBusiness = (limit, skip, callback) => {
    BusinessService.getSitemap(limit, skip, (res) => {
      if(res !== null && res.data.meta.http_status === 200) {
        this.setTotalPage(res.data)
        callback(this.parseBusinesses(res.data))
      } else {
        callback(null)
      }
    })
  }

  parseBusinesses = (data) => {
    const businesses = data.data
    const result = []

    businesses.forEach((b) => {
      result.push({
        id: b.id,
        type: b.type,
        name: b.attributes.name,
        slug: b.attributes.slug
      })
    })

    return result
  }

  setTotalPage = (data) => {
    const meta = data.meta

    const totalPage = Math.ceil(meta.total / LIMIT)

    this.setState({
      totalData: meta.total,
      totalPage: totalPage
    })
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

  renderDirectory = () => {
    const { page, totalPage } = this.state
    let display = []

    const baseUrl = '/sitemap/'
    const activeClassName = 'active'
    const defaultClassName = ''
    //iterate through how many page
    for(var i = 1; i <= totalPage; i++) {
      const className = parseInt(page) === i ? activeClassName : defaultClassName

      display.push(
        <li className = { className }>
          <a href = { baseUrl + i }>{ i }</a>
        </li>
      )
    }

    return (
      <div className = "directory-list">
        <table>
          <tr>
            <td>Directory: </td>
            <td>
              <ul>
                { display }
              </ul>
            </td>
          </tr>
        </table>
      </div>
    )
  }

  renderData = () => {
    const { data } = this.state
    let display = []

    const baseUrl = '/b/'

    data.forEach(d => {
      const bUrl = baseUrl + d.slug
      display.push(
        <div>
          <a href = { bUrl } target = "_blank" rel="noopener noreferrer"> { d.name } </a>
        </div>
      )
    })

    return (
      <div>
        <ul>
          { display }
        </ul>
      </div>
    )

  }
  
  render() {
    return (
      <Fragment>
        { this.renderHelmet() }
        <article>
        <Header/>
        <main className="container container__sitemap clearfix">
          <h1 className="title">Sitemap</h1>
          { this.renderDirectory() }
          { this.renderData() }
          {/* <p className="desc">
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
          </p> */}
        </main>
        <Footer/>
        </article>
      </Fragment>
    )
  }
}

export default Sitemap
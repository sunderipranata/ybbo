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

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      data: []
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
    const { page, data } = this.state
    let display = []

    let totalPage = 2
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

    data.forEach(d => {


    })

    return (
      <div>
        { display }
      </div>
    )

  }
  
  render() {
    return (
      <Fragment>
        { this.renderHelmet() }
        <article>
        <Header pageLabel={PageLabel.HEADER}/>
        <main className="container container__sitemap clearfix">
          <h1 className="title">Sitemap</h1>
          { this.renderDirectory() }
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
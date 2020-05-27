import React, { Component, Fragment } from 'react'
import Responsive from 'react-responsive'
import PropTypes from 'prop-types'

import Loader from '../../../components/Loader'

const Desktop = props => <Responsive {...props} minWidth={768} />

const storeAccounts = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'Twitter',
  bukalapak: 'Bukalapak',
  tokopedia: 'Tokopedia',
  shopee: 'Shopee',
  gojek: 'Gojek',
  grab: 'Grab',
  whatsapp: 'Whatsapp'
}

class BusinessDetailAbout extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    desc: PropTypes.string,
    accounts: PropTypes.object
  }

  renderLoading = () => {
    return (
      <Fragment>
        <Desktop><h2 className="bd-content__title">Tentang</h2></Desktop>
        <Loader width={200} height={12} borderRadius={8} marginBottom={16} />
        <Loader width={200} height={12} borderRadius={8} marginBottom={16} />
        <Loader height={12} borderRadius={8} marginBottom={16} />
        <Loader height={12} borderRadius={8} />
      </Fragment>
    )
  }

  renderAbout = () => {
    const { title, desc, accounts } = this.props
    const display = []
    
    if(typeof accounts !== 'undefined' && accounts !== null) {
      Object.keys(storeAccounts).forEach((key) => {
        if(typeof accounts[key] !== 'undefined' && accounts[key] !== null) {
          const accountDetail = accounts[key]
          const hasUrl = accountDetail.url !== null

          display.push(
            <tr>
              <td className="type">
                { storeAccounts[key] }
              </td>
              <td className="value">
                {
                  !hasUrl ? 
                  accountDetail.name :
                  <a href= {accountDetail.url} target="_blank" rel="noopener noreferrer"> {accountDetail.name} </a>
                }
              </td>
            </tr>
          )
        }
      })
    }

    return (
      <Fragment>
        <Desktop><h2 className="bd-content__title">Tentang {title}</h2></Desktop>
        <table className="bd-content__table">
          { display }
        </table>
        <p className="bd-content__desc">{desc}</p>
      </Fragment>
    )
  }

  render = () => {
    const { isLoading } = this.props

    return (
      <Fragment>
        { isLoading ? this.renderLoading() : this.renderAbout() }
      </Fragment>
    )
  }
}

export default BusinessDetailAbout
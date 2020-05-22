import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Loader from '../../../components/Loader'

class BusinessDetailAbout extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    desc: PropTypes.string,
    instagram: PropTypes.string,
    tokopedia: PropTypes.string
  }

  render() {
    const { isLoading, title, desc, instagram, tokopedia } = this.props

    return (
      <Fragment>
        { isLoading ? 
          <Fragment>
            <h2 className="bd-content__title">Tentang</h2>
            <Loader width={200} height={12} borderRadius={8} marginBottom={16} />
            <Loader width={200} height={12} borderRadius={8} marginBottom={16} />
            <Loader height={12} borderRadius={8} marginBottom={16} />
            <Loader height={12} borderRadius={8} />
          </Fragment>
          :
          <Fragment>
            <h2 className="bd-content__title">Tentang {title}</h2>
            <table className="bd-content__table">
              { instagram != null &&
                <tr>
                  <td className="type">Instagram</td>
                  <td className="value"><a href={"https://www.instagram.com/" + instagram} target="_blank">@{instagram}</a></td>
                </tr>
              }
              <tr>
                <td className="type">Bukalapak</td>
                <td className="value">@bukalapak</td>
              </tr>
              <tr>
                <td className="type">Shopee</td>
                <td className="value">@shopee</td>
              </tr>
              <tr>
                <td className="type">Tokopedia</td>
                <td className="value"><a href={"https://www.tokopedia.com/" + tokopedia} target="_blank">@{tokopedia}</a></td>
              </tr>
            </table>
            <p className="bd-content__desc">{desc}</p>
          </Fragment>
          }
      </Fragment>
    )
  }
}

export default BusinessDetailAbout
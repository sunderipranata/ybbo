import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Responsive from 'react-responsive'

import { SRLWrapper } from 'simple-react-lightbox'
import Loader from '../../../components/Loader'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const options = {
  buttons: {
    showDownloadButton: false,
    showThumbnailsButton: false,
    showAutoplayButton: false,
  },
  settings: {
    overlayColor: 'rgba(255,255,255, 0.88)'
  },
  caption: {
    captionColor: "#060606"
  }
}

class BusinessDetailGallery extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    pictures: PropTypes.arrayOf(PropTypes.string)
  }

  renderLoading = () => {
    return (
      <Fragment>
        <Desktop>
          <ul className="bd-content__gallery">
            <li style={{ width: "30%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
            <li style={{ width: "30%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
            <li style={{ width: "30%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
          </ul>
        </Desktop>
        <Mobile>
          <ul className="bd-content__gallery">
            <li style={{ width: "40%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
            <li style={{ width: "40%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
            <li style={{ width: "40%"}}>
              <Loader height={150} borderRadius={8} />
            </li>
          </ul>
        </Mobile>
      </Fragment>
    )
  }

  renderGallery = () => {
    const { pictures } = this.props
    let display = []
    if(typeof pictures !== 'undefined' && pictures !== null) {
      display = pictures.map((val, idx) => {
        const altText = "picture-" + idx
        return (
          <li key = { altText }>
            <a href= { val } data-attribute="SRL">
              <img src= { val } alt= { altText } />
            </a>
          </li>
        )
      })
    }
    
    return (
      <SRLWrapper options={options}>
        <ul className="bd-content__gallery">
          { display }
        </ul>
      </SRLWrapper>
    )
  }

  render = () => {
    const { isLoading } = this.props

    return (
      <Fragment>
        <h2 className="bd-content__title bd-content__title--padding">Galeri</h2>
        { isLoading ? this.renderLoading() : this.renderGallery() }
      </Fragment>
    )
  }
}

export default BusinessDetailGallery

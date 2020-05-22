import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { SRLWrapper } from 'simple-react-lightbox'
import Loader from '../../../components/Loader'

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
    isLoading: PropTypes.bool
  }

  render() {
    const { isLoading } = this.props

    return (
      <Fragment>
        <h2 className="bd-content__title bd-content__title--padding">Galeri</h2>
        { isLoading ?
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
          :
          <SRLWrapper options={options}>
            <ul className="bd-content__gallery">
              <li>
                <a href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash18.jpg" data-attribute="SRL">
                  <img src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash18.jpg" alt="Menu" />
                </a>
              </li>
              <li>
                <a href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg" data-attribute="SRL">
                  <img src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg" alt="Galeri 1" />
                </a>
              </li>
              <li>
                <a href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg" data-attribute="SRL">
                  <img src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg" alt="Galeri 2" />
                </a>
              </li>
              <li>
                <a href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg" data-attribute="SRL">
                  <img src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg" alt="Galeri 3" />
                </a>
              </li>
            </ul>
          </SRLWrapper>
       }

      </Fragment>
    )
  }
}

export default BusinessDetailGallery

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import Loader from '../../../components/Loader'

class BusinessDetailIntro extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    img: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    category: PropTypes.string
  }

  render() {
    const { isLoading, img, title, location, category } = this.props

    return (
      <div className="bd-intro">
        { isLoading ? 
          <div className="bd-intro__logo" style={{ background: "#F2F2F2"}} />
            :
          <div className="bd-intro__logo" style={{ backgroundImage: "url(" + img + ")"}} /> 
        }
        <div className="bd-intro__desc">
          { isLoading ? <Loader width={140} height={32} borderRadius={8} marginBottom={12} /> : <h1 className="title">{title}</h1>}
          { isLoading ? 
            <Fragment>
              <Loader width={180} height={16} borderRadius={8} />
            </Fragment>
            :
            <Fragment>
                {category != null && <label className="label-card">{category}</label>}
                {location != null && 
                  <span className="location" style={{ marginLeft: "12px" }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "4px" }} />
                    {location}
                  </span> 
                }
            </Fragment>
          }
         
        </div>
      </div>
    )
  }
}

export default BusinessDetailIntro

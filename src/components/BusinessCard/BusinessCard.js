import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'

import './BusinessCard.scss'
import Loader from '../Loader'

class BusinessCard extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    img: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    category: PropTypes.string,
    backers: PropTypes.number
  }

  render() {
    const { loading, img, title, location, category, backers } = this.props

    return (
      <div className={ClassNames('business__card', {loading: loading === true})}>
        { loading ? 
          <Fragment>
            <Loader height={180} />
            <div className="bc__content">
              <Loader width={140} height={16} borderRadius={8} marginBottom={8} />
              <Loader width={180} height={14} borderRadius={8} marginBottom={4}  />
            </div>
          </Fragment>
          : 
          <Fragment>
              { backers < 10 && <span className="ribbon">Bisnis ini butuh bantuanmu</span> }
              <div className="bc__image"  style={{ background: "url(" + img + ") center center / cover no-repeat"}}>
                  <div className="img__content">
                    {category != null && 
                      <span className="label-card" style={{ marginRight: "12px" }}>
                        {category}
                      </span>
                    }
                  </div> 

              </div>
              <div className="bc__content">
                <p className="title">{title}</p>
                {location != null && 
                  <span className="desc" style={{ marginRight: "16px" }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "4px" }} />
                    {location}
                  </span> 
                }
                { backers >= 0 && 
                  <span className="desc">
                    <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: "4px" }} />
                    { backers < 10 && backers + " " }
                    { backers >= 10 && backers < 20 && "10+ " }
                    { backers >= 20 && backers < 30 && "20+ " }
                    { backers >= 30 && backers < 40 && "30+ " }
                    { backers >= 40 && backers < 50 && "40+ " }
                    { backers >= 50 && backers < 60 && "50+ " }
                    { backers >= 60 && backers < 70 && "60+ " }
                    { backers >= 70 && backers < 80 && "70+ " }
                    { backers >= 80 && backers < 90 && "80+ " }
                    { backers >= 90 && backers < 100 && "90+ " }
                    { backers >= 100 && "100+ " }
                    Pendukung
                  </span>
                }
              </div>
          </Fragment>
        }

      </div>
    );
  }
}

export default BusinessCard;

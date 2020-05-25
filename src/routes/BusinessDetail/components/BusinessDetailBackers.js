import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconVerified from '../assets/ic-verified.png'
import Loader from '../../../components/Loader'

import moment from 'moment'

const BACKER_SIZE = 5
const DEFAULT_UNVERIFIED = "telah mendaftar untuk mendukung"
const DEFAULT_VERIFIED = "telah mempost di Instagram"
const SECONDS_DIFF = "detik yang lalu"
const MINUTES_DIFF = "menit yang lalu"
const HOUR_DIFF = "jam yang lalu"
const DAYS_DIFF = "hari yang lalu"
const ANONYMOUS_USER = "anonim"

class BusinessDetailBackers extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    businessDetail: PropTypes.object
  }

  state = {
    isLoading: true,
    isBackersLoading: false,
    backers: [],
    lastOffset: null,
    total: 0
  }

  componentWillMount = () => {
    this.setState({
      isLoading: this.props.isLoading
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { backers, lastOffset } = this.state
    const { businessDetail } = nextProps

    if(backers.length === 0) {
      if(typeof businessDetail !== 'undefined' && businessDetail !== null) {
        this.toggleLoadingState(true)
        this.setState({
          businessDetail: businessDetail
        })

        const id = businessDetail.id
        nextProps.fetchData(id, BACKER_SIZE, lastOffset, (res) => {
          if(res !== null) {
            const backerDetails = res.backerDetails
            const total = res.total
            const lastId = backerDetails.length > 0 ? backerDetails[backerDetails.length-1].id : null

            this.setState({
              backers: backerDetails,
              lastOffset: lastId,
              total: total
            }, () => {
              this.toggleLoadingState(false)
            })
          }
        })
      }
    }
  }

  toggleLoadingState = (loading) => {
    this.setState({
      isLoading: loading
    })
  }

  toggleBackersLoading = (loading) => {
    this.setState({
      isBackersLoading: loading
    })
  } 

  loadMoreBackers = () => {
    const { businessDetail, lastOffset } = this.state

    if(typeof businessDetail !== 'undefined' && businessDetail !== null) {
      const id = businessDetail.id

      this.toggleBackersLoading(true)
      this.props.fetchData(id, BACKER_SIZE, lastOffset, (res) => {
        if(res !== null) {
          const curBackers = [ ...this.state.backers ]
          const backerDetails = res.backerDetails
          backerDetails.forEach((r) => {
            curBackers.push(r)
          })
          const lastId = backerDetails[backerDetails.length-1].id
          this.setState({
            backers: curBackers,
            lastOffset: lastId
          }, () => {
            this.toggleBackersLoading(false)
          })
        } else {
          this.toggleBackersLoading(false)
        }
      })
    }
  } 

  renderLoading = () => {
    return (
      <Fragment>
        <h2 className="bd-content__title">Pendukung</h2>
        <ul className="bd-content__backers">
          <li>
            <Loader height={12} borderRadius={8} marginBottom={8} />
            <Loader width={200} height={12} borderRadius={8} />
          </li>
          <li>
            <Loader height={12} borderRadius={8} marginBottom={8} />
            <Loader width={200} height={12} borderRadius={8} />
          </li>
          <li>
            <Loader height={12} borderRadius={8} marginBottom={8} />
            <Loader width={200} height={12} borderRadius={8} />
          </li>
          <li>
            <Loader height={12} borderRadius={8} marginBottom={8} />
            <Loader width={200} height={12} borderRadius={8} />
          </li>
          <li>
            <Loader height={12} borderRadius={8} marginBottom={8} />
            <Loader width={200} height={12} borderRadius={8} />
          </li>
        </ul>
      </Fragment>
    )
  }

  renderBackers = () => {
    const { businessDetail } = this.props
    const { backers, isBackersLoading, total } = this.state
    const hasMoreBackers = backers.length < total
    const now = moment()

    if(backers.length < 1) {
      return (
        <Fragment>
          <h2 className="bd-content__title">Pendukung</h2>
          <div className="bd-content__empty">
            <span role="img" aria-label="Crying Face" className="emoji">😢</span>
            <p className="title">{businessDetail.name} belum ada pendukungnya nih.</p>
            <p className="desc">Yuk, jadi yang pertama dengan mendaftarkan Instagram kamu.</p>
          </div>
        </Fragment>
      )
    } else {
      const display = backers.map((val, idx) => {
        const name = val.username
        const isVerified = val.isVerified
        let comment = val.comment
        const commentText = []
        const createdAt = moment(val.createdAt)

        const timeDurationString = this.determineTimeDifferenceString(now, createdAt)
        if(comment === null) {
          if(isVerified) {
            comment = DEFAULT_VERIFIED
          } else {
            comment = DEFAULT_UNVERIFIED  
          }
          
          if(name !== ANONYMOUS_USER) {
            const instagramUrl = 'https://instagram.com/' + name
            commentText.push(
              <span className="text">
                <a href={ instagramUrl } target="_blank" rel="noopener noreferrer"> { name } </a>
                { " " + comment }
              </span>
            )
          } else {
            commentText.push(
              <span className="text">{ name + " " + comment }</span>
            )
          } 
        } else {
          if(name !== ANONYMOUS_USER) {
            const instagramUrl = 'https://instagram.com/' + name
            commentText.push(
              <span className="text">
                Kata
                <a href={ instagramUrl } target="_blank" rel="noopener noreferrer"> { name } </a>
                { ": " + comment }
              </span>
            )
          } else {
            commentText.push(
              <span className="text">Kata { name }: "{ comment }"</span>
            )
          }
        }

        if(isVerified) {
          commentText.push(
            <span className="tooltip">
              <img src={IconVerified} alt="Terverfikasi" className="backers-verified" />
              <span class="tooltiptext">
                Kami sudah melakukan pengecekan bahwa { name } telah mempost di Instagram
              </span>
            </span>
          )
        }

        return (
          <li>
            <p className="backers-title">
              { commentText }
            </p>
            <p className="backers-time">{ timeDurationString }</p>
          </li>
        )
      })

      return (
        <Fragment>
          <h2 className="bd-content__title">Pendukung <small>({ total })</small></h2>
          <ul className="bd-content__backers">
            { display }
            {
              isBackersLoading &&
              <li>
                <Loader height={12} borderRadius={8} marginBottom={8} />
                <Loader width={200} height={12} borderRadius={8} />
              </li>
            }
          </ul>
          {
            hasMoreBackers &&
            <button className="btn-load"
              onClick = { this.loadMoreBackers.bind(this) }>
              Muat lebih banyak
            </button>
          }
        </Fragment>
      )
    }
  }

  determineTimeDifferenceString = (timeNow, timeData) => {
    const duration = moment.duration(timeNow.diff(timeData))
    const days = duration.asDays().toFixed(0)
    if(days >= 1) {
      return days + " " + DAYS_DIFF
    } else {
      const hour = duration.asHours().toFixed(0)
      if(hour >= 1) {
        return hour + " " + HOUR_DIFF 
      } else {
        const minutes = duration.asMinutes().toFixed(0)
        if(minutes >= 1) {
          return minutes + " " + MINUTES_DIFF
        } else {
          const seconds = duration.asSeconds().toFixed(0)
          return seconds + " " + SECONDS_DIFF
        }
      }
    }
  }

  render = () => {
    const { isLoading } = this.state

    return (
      <Fragment>
        { isLoading ? this.renderLoading() : this.renderBackers() }
      </Fragment>
    )
  }
}

export default BusinessDetailBackers

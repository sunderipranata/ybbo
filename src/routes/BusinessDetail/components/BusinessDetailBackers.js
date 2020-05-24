import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconVerified from '../assets/ic-verified.png'
import Loader from '../../../components/Loader'

const BACKER_SIZE = 5
const DEFAULT_UNVERIFIED = "telah mendaftar untuk mendukung"
const DEFAULT_VERIFIED = "telah mempost di Instagram"

class BusinessDetailBackers extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    businessDetail: PropTypes.object
  }

  state = {
    isLoading: true,
    isBackersLoading: false,
    backers: []
  }

  componentWillMount = () => {
    this.setState({
      isLoading: this.props.isLoading
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { backers } = this.state
    const { businessDetail } = nextProps

    if(backers.length === 0) {
      if(typeof businessDetail !== 'undefined' && businessDetail !== null) {
        const id = businessDetail.id
        
        this.toggleLoadingState(true)
        nextProps.fetchData(id, BACKER_SIZE, (res) => {
          if(res !== null) {
            this.setState({
              backers: res
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

  renderLoading = () => {
    return (
      <div>
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
      </div>
    )
  }

  renderBackers = () => {
    const { title } = this.props
    const { backers, isBackersLoading } = this.state

    if(backers.length < 1) {
      return (
        <div className="bd-content__empty">
          <span role="img" aria-label="Crying Face" className="emoji">😢</span>
          <p className="title">{title} belum ada pendukungnya nih.</p>
          <p className="desc">Yuk, jadi yang pertama dengan mendaftarkan Instagram kamu.</p>
        </div>
      )
    } else {
      const display = backers.map((val, idx) => {
        const name = val.username
        const isVerified = val.isVerified
        let comment = val.comment
        const commentText = []

        if(comment === null) {
          if(isVerified) {
            comment = DEFAULT_VERIFIED
          } else {
            comment = DEFAULT_UNVERIFIED  
          }
          
          commentText.push(
            <span className="text">{ name + " " + comment }</span>
          )
        } else {
          commentText.push(
            <span className="text">Kata { name }: "{ comment }"</span>
          )
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
            {/* <p className="backers-time">17 menit yang lalu</p> */}
          </li>
        )
      })

      return (
        <Fragment>
          <h2 className="bd-content__title">Pendukung <small>({ backers.length })</small></h2>
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
          <a href="/" className="btn-load">Muat lebih banyak</a>
        </Fragment>
      )
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

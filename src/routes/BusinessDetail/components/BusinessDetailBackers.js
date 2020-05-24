import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconVerified from '../assets/ic-verified.png'
import Loader from '../../../components/Loader'

import moment from 'moment'

const BACKER_SIZE = 10
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
    backers: [],
    lastOffset: null
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
            const lastId = res[res.length-1].id

            this.setState({
              backers: res,
              lastOffset: lastId
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
        const curBackers = [ ...this.state.backers ]
        res.forEach((r) => {
          curBackers.push(r)
        })
        if(res !== null) {
          this.setState({
            backers: curBackers
          }, () => {
            this.toggleBackersLoading(false)
          })
        }
      })
    }
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
          <button className="btn-load"
            onClick = { this.loadMoreBackers.bind(this) }>
            Muat lebih banyak
          </button>
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

import React, { Component } from 'react'

import ClassNames from 'classnames'
import Responsive from 'react-responsive'
import Carousel from 'nuka-carousel'

import StepCard from '../../../components/StepCard/StepCard'

import IconArrowNext from '../assets/next-slide.png'
import IconArrowPrev from '../assets/prev-slide.png'

const Desktop = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

class Steps extends Component {
  state = {
    detailShown: 1,
    slideIndex: 0
  }

  getButtonStyles(disabled) {
    return {
      opacity: disabled ? 0 : 1,
      transition: 'opacity 0.1s ease-in-out'
    }
  }

  handleDetailShow = number => {
    this.setState({
      detailShown: number
    })
  }

  handleFirstLoad = () => {
    this.carouselRef.setDimensions()
  }

  render() {
    const { detailShown, slideIndex } = this.state

    return (
      <section className="home__steps clearfix">
        <Desktop>
        <div className="steps-section__title">
          <h2 className="steps__title">Langkah Mudah Bantu Bisnis Online</h2>
        </div>
        <div className="steps-section__content">
          <ul className="steps__list">
            <li className="steps__list--item" onClick={() => this.handleDetailShow(1)}>
              <div className={ClassNames('list__number', {active: detailShown === 1})}>1</div>
              <div className="list__desc">
                <h3 className={ClassNames('desc__title', {active: detailShown === 1})}>Pilih Bisnis Online</h3>
                <p className={ClassNames('desc__content', {active: detailShown === 1})}>
                  Kamu bisa memilih bisnis yang ingin kamu bantu promosikan dari daftar bisnis yang kami punya
                </p>
              </div>
            </li>
            <li className="steps__list--item" onClick={() => this.handleDetailShow(2)}>
              <div className={ClassNames('list__number', {active: detailShown === 2})}>2</div>
              <div className="list__desc">
                <h3 className={ClassNames('desc__title', {active: detailShown === 2})}>Download Aset</h3>
                <p className={ClassNames('desc__content', {active: detailShown === 2})}>
                  Download gambar atau video dari bisnis yang kamu pilih untuk dipromosikan di sosial media mu
                </p>
              </div>
            </li>
            <li className="steps__list--item" onClick={() => this.handleDetailShow(3)}>
              <div className={ClassNames('list__number', {active: detailShown === 3})}>3</div>
              <div className="list__desc">
                <h3 className={ClassNames('desc__title', {active: detailShown === 3})}>Promosikan di Sosial Media</h3>
                <p className={ClassNames('desc__content', {active: detailShown === 3})}>
                  Post gambar atau video yang sudah kamu download dan tag kami <a href="/" target="_blank">@YukBantuBisnis.Online</a>
                </p>
              </div>
            </li>
            <li className="steps__list--item" onClick={() => this.handleDetailShow(4)}>
              <div className={ClassNames('list__number', {active: this.state.detailShown === 4})}>4</div>
              <div className="list__desc">
                <h3 className={ClassNames('desc__title', {active: detailShown === 4})}>Selesai</h3>
                <p className={ClassNames('desc__content', {active: detailShown === 4})}>
                  Akun mu akan tercantum di daftar pendukung bisnis kami. Terima kasih atas kontribusi mu
                </p>
              </div>
            </li>
          </ul>
        </div>
        </Desktop>
        <Mobile>
          <h2 className="steps__title">Langkah Mudah Bantu<br />Bisnis Online</h2>
          <Carousel 
            ref={node => {this.carouselRef = node}}
            autoplay
            slideIndex={slideIndex}
            afterSlide={slideIndex => this.setState({ slideIndex })}
            renderCenterLeftControls={({ previousSlide }) => (
              <img
                className="steps__arrow steps__arrow--prev"
                style={this.getButtonStyles(slideIndex === 0)}
                onClick={previousSlide}
                src={IconArrowPrev}
                alt="Langkah Sebelumnya"
              />
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <img
                className="steps__arrow steps__arrow--next"
                style={this.getButtonStyles(slideIndex === 3)}
                onClick={nextSlide}
                src={IconArrowNext}
                alt="Langkah Selanjutnya"
              />
            )}
            renderBottomCenterControls={() => (
              <ul className="slider-dots">
                <li
                  className={slideIndex === 0 ? 'active' : ''}
                  onClick={() => this.setState({ slideIndex: 0 })}
                />
                <li
                  className={slideIndex === 1 ? 'active' : ''}
                  onClick={() => this.setState({ slideIndex: 1 })}
                />
                <li
                  className={slideIndex === 2 ? 'active' : ''}
                  onClick={() => this.setState({ slideIndex: 2 })}
                />
                <li
                  className={slideIndex === 3 ? 'active' : ''}
                  onClick={() => this.setState({ slideIndex: 3 })}
                />
              </ul>
            )}
          >
            <div className="steps__list--mobile" onLoad={this.handleFirstLoad}>
              <StepCard index="1" title="Pilih Bisnis Online" desc="Kamu bisa memilih bisnis yang ingin kamu bantu promosikan dari daftar bisnis yang kami punya" />
            </div>
            <div className="steps__list--mobile" onLoad={this.handleFirstLoad}>
              <StepCard index="2" title="Download Aset" desc="Download gambar atau video dari bisnis yang kamu pilih untuk dipromosikan di sosial media mu" />
            </div>
            <div className="steps__list--mobile" onLoad={this.handleFirstLoad}>
              <StepCard index="3" title="Promosikan di Sosial Media" desc="Post gambar atau video yang sudah kamu download dan tag kami @YukBantuBisnis.Online" />
            </div>
            <div className="steps__list--mobile"  onLoad={this.handleFirstLoad}>
              <StepCard index="4" title="Selesai" desc="Akun mu akan tercantum di daftar pendukung bisnis kami. Terima kasih atas kontribusi mu." />
            </div>
          </Carousel>
        </Mobile>
      </section>
    );
  }
}

export default Steps;
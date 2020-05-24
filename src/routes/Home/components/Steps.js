import React, { Component } from 'react'

import ClassNames from 'classnames'
import Responsive from 'react-responsive'
import Carousel from 'nuka-carousel'

import StepCard from '../../../components/StepCard/StepCard'

import IconArrowNext from '../assets/next-slide.png'
import IconArrowPrev from '../assets/prev-slide.png'

import MockUp from '../assets/mockup.png'
import MockupStep3 from '../assets/mockupStep3.png'
import Step1 from '../assets/step1.png'
import Step2 from '../assets/step2.png'
import Step3Desc from '../assets/step3Desc.png'
import Step3Tag1 from '../assets/step3Tag1.png'
import Step3Tag2 from '../assets/step3Tag2.png'
import Step4 from '../assets/step4.png'

import { INSTAGRAM_PATH } from '../../../routes'

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

  setIconPhoneStyles = activeStep => {
    return {
      opacity: activeStep ? '1' : '0',
      transition: 'opacity 0.5s ease-in-out',
      transitionDelay: activeStep ? '0.5s' : '0s'
    }
  }

  setIconPhoneMobileStyles = activeStep => {
    return {
      opacity: activeStep ? '1' : '0',
      transition: 'opacity 0.25s ease-in-out'
    }
  }

  setIconStepStyles = activeStep => {
    return {
      opacity: activeStep ? '1' : '0',
      transform: activeStep ? 'scale(1)' : 'scale(0)',
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      transitionDelay: activeStep ? '0.5s' : '0s'
    }
  }

  render() {
    const { detailShown, slideIndex } = this.state

    return (
      <section className="home__steps">
        <Desktop>
          {/* <div className="steps-section__title">
          </div> */}
          <div className="steps-section__content">
            <h2 className="steps__title">Langkah Mudah Bantu Bisnis Online</h2>

            <ul className="steps__list">
              <li className="steps__list--item" onClick={() => this.handleDetailShow(1)}>
                <div className={ClassNames('list__number', {active: detailShown === 1})}>1</div>
                <div className="list__desc">
                  <h3 className={ClassNames('desc__title', {active: detailShown === 1})}>Pilih Bisnis Online</h3>
                  <p className={ClassNames('desc__content', {active: detailShown === 1})}>
                    Kamu bisa memilih bisnis yang ingin kamu bantu promosikan dari daftar bisnis yang kami miliki.
                  </p>
                </div>
              </li>
              <li className="steps__list--item" onClick={() => this.handleDetailShow(2)}>
                <div className={ClassNames('list__number', {active: detailShown === 2})}>2</div>
                <div className="list__desc">
                  <h3 className={ClassNames('desc__title', {active: detailShown === 2})}>Order atau Download</h3>
                  <p className={ClassNames('desc__content', {active: detailShown === 2})}>
                    Kamu dapat mendukung dengan cara memesan langsung produk yang kamu suka atau cukup download gambar/video yang disediakan.
                  </p>
                </div>
              </li>
              <li className="steps__list--item" onClick={() => this.handleDetailShow(3)}>
                <div className={ClassNames('list__number', {active: detailShown === 3})}>3</div>
                <div className="list__desc">
                  <h3 className={ClassNames('desc__title', {active: detailShown === 3})}>Post & Tag Kami di Instagram</h3>
                  <p className={ClassNames('desc__content', {active: detailShown === 3})}>
                    Post gambar/video hasil orderan kamu atau media yang telah kamu download. Jangan lupa tambahkan testimoni dan tag{' '}
                    <a href={INSTAGRAM_PATH} target="_blank">@YukBantuBisnis.Online</a> ya! :)
                  </p>
                </div>
              </li>
              <li className="steps__list--item" onClick={() => this.handleDetailShow(4)}>
                <div className={ClassNames('list__number', {active: this.state.detailShown === 4})}>4</div>
                <div className="list__desc">
                  <h3 className={ClassNames('desc__title', {active: detailShown === 4})}>Jadi Pendukung Terverifikasi</h3>
                  <p className={ClassNames('desc__content', {active: detailShown === 4})}>
                    Akun kamu akan tercatat sebagai akun terverifikasi dan testimoni kamu akan ditampilkan.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="steps-section__img">
            <div className="illustration__wrapper">
              <img src={MockUp} style={this.setIconPhoneStyles(detailShown === 1)} className="icon__phone" alt="Phone" />
              <img src={Step1} style={this.setIconStepStyles(detailShown === 1)} className="icon__steps icon__steps--one" alt="Langkah 1" />
            </div>
            <div className="illustration__wrapper">
              <img src={MockUp} style={this.setIconPhoneStyles(detailShown === 2)} className="icon__phone" alt="Phone" />
              <img src={Step2} style={this.setIconStepStyles(detailShown === 2)} className="icon__steps icon__steps--two" alt="Langkah 2" />
            </div>
            <div className="illustration__wrapper">
              <img src={MockupStep3} style={this.setIconPhoneStyles(detailShown === 3)} className="icon__phone" alt="Phone" />
              <img src={Step3Desc} style={this.setIconStepStyles(detailShown === 3)} className="icon__steps icon__steps--three-caps" alt="Langkah 3" />
              <img src={Step3Tag1} style={this.setIconStepStyles(detailShown === 3)} className="icon__steps icon__steps--three-tag1" alt="Tag Instagram Bisnis Online" />
              <img src={Step3Tag2} style={this.setIconStepStyles(detailShown === 3)} className="icon__steps icon__steps--three-tag2" alt="Tag Instagram @YukBantuBisnis.Online" />
            </div>
            <div className="illustration__wrapper">
              <img src={MockUp} style={this.setIconPhoneStyles(detailShown === 4)} className="icon__phone" alt="Phone" />
              <img src={Step4} style={this.setIconStepStyles(detailShown === 4)} className="icon__steps icon__steps--four" alt="Langkah 4" />
            </div>
          </div>
        </Desktop>
        <Mobile>
          <h2 className="steps__title">Langkah Mudah Bantu<br />Bisnis Online</h2>
          <Carousel 
            autoplay
            autoplayInterval={5000}
            ref={node => {this.carouselRef = node}}
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
              <StepCard index="1" title="Pilih Bisnis Online">
                <div className="steps-section__img">
                  <img src={MockUp} style={this.setIconPhoneMobileStyles(slideIndex === 0)} className="icon__phone" alt="Phone" />
                  <img src={Step1} style={this.setIconStepStyles(slideIndex === 0)} className="icon__steps icon__steps--one" alt="Langkah 1" />
                </div>
                Kamu bisa memilih bisnis yang ingin kamu bantu promosikan dari daftar bisnis yang kami miliki.
              </StepCard>
            </div>
            <div className="steps__list--mobile" onLoad={this.handleFirstLoad}>
              <StepCard index="2" title="Order atau Download">
                <div className="steps-section__img">
                  <img src={MockUp} style={this.setIconPhoneMobileStyles(slideIndex === 1)} className="icon__phone" alt="Phone" />
                  <img src={Step2} style={this.setIconStepStyles(slideIndex === 1)} className="icon__steps icon__steps--two" alt="Langkah 2" />
                </div>
                Kamu dapat mendukung dengan cara memesan langsung produk yang kamu suka atau cukup download gambar/video yang disediakan.
              </StepCard>
            </div>
            <div className="steps__list--mobile" onLoad={this.handleFirstLoad}>
              <StepCard index="3" title="Post & Tag Kami di Instagram">
                <div className="steps-section__img">
                  <img src={MockupStep3} style={this.setIconPhoneMobileStyles(slideIndex === 2)} className="icon__phone" alt="Phone" />
                  <img src={Step3Desc} style={this.setIconStepStyles(slideIndex === 2)} className="icon__steps icon__steps--three-caps" alt="Langkah 3" />
                  <img src={Step3Tag1} style={this.setIconStepStyles(slideIndex === 2)} className="icon__steps icon__steps--three-tag1" alt="Tag Instagram Bisnis Online" />
                  <img src={Step3Tag2} style={this.setIconStepStyles(slideIndex === 2)} className="icon__steps icon__steps--three-tag2" alt="Tag Instagram @YukBantuBisnis.Online" />
                </div>
                Post gambar/video hasil orderan kamu atau media yang telah kamu download. Jangan lupa tambahkan testimoni dan tag @YukBantuBisnis.Online ya! :)
              </StepCard>
            </div>
            <div className="steps__list--mobile"  onLoad={this.handleFirstLoad}>
              <StepCard index="4" title="Jadi Pendukung Terverifikasi">
                <div className="steps-section__img">
                  <img src={MockUp} style={this.setIconPhoneStyles(slideIndex === 3)} className="icon__phone" alt="Phone" />
                  <img src={Step4} style={this.setIconStepStyles(slideIndex === 3)} className="icon__steps icon__steps--four" alt="Langkah 4" />
                </div>
                Akun kamu akan tercatat sebagai akun terverifikasi dan testimoni kamu akan ditampilkan.
              </StepCard>
            </div>
          </Carousel>
        </Mobile>
      </section>
    );
  }
}

export default Steps;
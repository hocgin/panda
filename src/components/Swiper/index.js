import React from 'react';
import styles from './index.less';
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';

class Index extends React.PureComponent {
  state = {
    swiper: null,
  };
  gallerySwiperParams = {};

  constructor(...args) {
    super(...args);
    let { active, onChange } = args[0];

    this.gallerySwiperParams = {
      slidesPerView: 1,
      centeredSlides: true,
      getSwiper: obj => {
        if (this.state && !this.state.swiper) {
          this.setState({
            swiper: obj,
          });
          if (active) {
            obj.slideTo(active);
          }
        }
      },
      on: {
        slideChange: () => {
          if (this.state && this.state.swiper) {
            let active = this.state.swiper.realIndex;
            if (onChange) {
              onChange(active);
            }
          }
        },
      },
    };
  }

  render() {
    let { images } = this.props;

    return (<div className={styles.component}>
      <div className={styles.gallery}>
        <Swiper {...this.gallerySwiperParams}>
          {images.map((item, index) => (<img key={`${index}`} src={item} alt=""/>))}
        </Swiper>
      </div>
    </div>);
  }

}

export default Index;
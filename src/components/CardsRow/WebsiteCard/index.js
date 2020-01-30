import React from 'react';
import styles from './index.less';
import Img from 'react-image';

class Index extends React.PureComponent {
  render() {
    let { title, src, desc, href } = this.props;
    return (<a href={href} target="_blank">
      <div className={styles.component}>
        <div className={styles.imageWrapper}>
          <Img className={styles.image}
               unloader={this.renderUnloader()}
               loader={this.renderLoader()}
               src={src}/>
        </div>
        <div className={styles.meta}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>
      </div>
    </a>);
  }

  renderUnloader = () => {
    return (<div style={{
      height: 45,
      width: 45,
      backgroundColor: '#DEE1E5',
    }}>
    </div>);
  };

  renderLoader = () => {
    return (<div style={{
      height: 45,
      width: 45,
      backgroundColor: '#DEE1E5',
    }}>
    </div>);
  };
}

export default Index;

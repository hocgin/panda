import styles from './index.less';
import classnames from 'classnames';
import { HeartFilled } from '@ant-design/icons';

function BasicLayout(props) {
  return (
    <div className={styles.wrapper}>
      {/*<div className={styles.top}>Yay! Welcome to umi!</div>*/}
      {props.children}
      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <HeartFilled className={classnames(styles.heartbeat, styles.heart)} />
          <a className={styles.me} href="https://hocg.in" target="_blank" rel="noopener noreferrer">HOCGIN</a>
          &nbsp;
          <span className={styles.year}>2020<sup>&copy;</sup></span>
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;

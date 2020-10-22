import styles from './index.less';
import classnames from 'classnames';
import { HeartFilled } from '@ant-design/icons';
import GinFooter from '@hocgin/gin-footer'
import React from "react";

function BasicLayout(props) {
  window.console.log = (...args) => {
    // ..
  };
  window.console.debug = (...args) => {
    // ..
  };
  return (
    <div className={styles.wrapper}>
      {props.children}
      <GinFooter/>
    </div>
  );
}

export default BasicLayout;

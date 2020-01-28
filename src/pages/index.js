import styles from './index.less';
import { BackTop } from 'antd';
import * as React from 'react';
import { connect } from 'dva';

@connect(({ apps, loading }) => {
  return {};
}, dispatch => ({}))
class index extends React.Component {
  state = {};

  render() {
    let {} = this.state;
    let {} = this.props;
    return (
      <div className={styles.pageWrapper}>
        <BackTop/>
      </div>
    );
  }
}

export default index;
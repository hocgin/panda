import styles from './index.less';
import { BackTop } from 'antd';
import * as React from 'react';
import CardsRow from '@/components/CardsRow';
import { connect } from 'dva';

@connect(({ global: { siteGroup }, loading }) => {
  return {
    siteGroup: siteGroup,
  };
}, dispatch => ({}))
class index extends React.Component {
  state = {};

  render() {
    let {} = this.state;
    let { siteGroup } = this.props;
    return (
      <div className={styles.pageWrapper}>
        {(siteGroup).map(({ title = '', websites = [] }) => (<CardsRow title={title} websites={websites}/>))}
        <BackTop/>
      </div>
    );
  }
}

export default index;
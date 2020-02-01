import styles from './index.less';
import { BackTop } from 'antd';
import * as React from 'react';
import CardsRow from '@/components/CardsRow';
import SearchBar from '@/components/SearchBar';
import { connect } from 'dva';

@connect(({ global: { siteGroup, autocomplete = [] }, loading }) => {
  return {
    siteGroup: siteGroup,
    autocomplete: autocomplete,
  };
}, dispatch => ({
  $fetchAutocomplete: (args = {}) => dispatch({ type: 'global/fetchAutocomplete', ...args }),
}))
class index extends React.Component {
  state = {};

  render() {
    let {} = this.state;
    let { siteGroup, autocomplete } = this.props;
    return (
      <div className={styles.pageWrapper}>
        <SearchBar wrapperClassName={styles.searchBar}
                   autocomplete={autocomplete}
                   onChangeKeyword={this.onChangeKeyword}/>
        {(siteGroup).map(({ title = '', websites = [] }) => (<CardsRow title={title} websites={websites}/>))}
        <BackTop/>
      </div>
    );
  }

  onChangeKeyword = (keyword) => {
    let { $fetchAutocomplete } = this.props;
    $fetchAutocomplete({ payload: { q: keyword } });
  };
}

export default index;
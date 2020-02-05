import styles from './index.less';
import { BackTop } from 'antd';
import * as React from 'react';
import CardsRow from '@/components/CardsRow';
import SearchBar from '@/components/SearchBar';
import Storage from '@/utils/storage';
import { connect } from 'dva';

@connect(({ global: { siteGroup, searchEngine = [], autocomplete = [] }, loading }) => {
  return {
    siteGroup: siteGroup,
    searchEngine: searchEngine,
    autocomplete: autocomplete,
  };
}, dispatch => ({
  $fetchAutocomplete: (args = {}) => dispatch({ type: 'global/fetchAutocomplete', ...args }),
}))
class index extends React.Component {
  state = {};

  render() {
    let { siteGroup, autocomplete, searchEngine } = this.props;
    let lastWebsites = this.getLastWebsites();
    return (
      <div className={styles.pageWrapper}>
        <SearchBar wrapperClassName={styles.searchBar}
                   searchEngine={searchEngine}
                   autocomplete={autocomplete}
                   onChangeKeyword={this.onChangeKeyword}/>
        {lastWebsites.length > 0 && <CardsRow title={'最近访问'} websites={lastWebsites}/>}
        {(siteGroup).map(({ title = '', websites = [] }, index) => (
          <CardsRow key={index} title={title} websites={websites}/>))}
        <BackTop/>
      </div>
    );
  }

  onChangeKeyword = (keyword) => {
    let { $fetchAutocomplete } = this.props;
    $fetchAutocomplete({ payload: { q: keyword } });
  };

  getLastWebsites = () => {
    let MAX_COUNT = 3;
    return Object.values(Storage.getLastWebsiteMap())
      .sort(({ index: index1 }, { index: index2 }) => index2 - index1)
      .map(({ value }) => value)
      .filter((_, index) => index < MAX_COUNT);
  };
}

export default index;
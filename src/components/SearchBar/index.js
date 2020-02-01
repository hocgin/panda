import React from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import classnames from 'classnames';

class Index extends React.PureComponent {
  state = {
    keyword: '',
  };

  render() {
    let { autocomplete = [], wrapperClassName } = this.props;
    let { keyword } = this.state;
    let hasKeyword = !!`${keyword}`.length;
    let hasAutocomplete = hasKeyword && autocomplete.length;
    let that = this;
    return (
      <div className={classnames(styles.component, wrapperClassName, {
        [styles.inputed]: hasKeyword,
      })}>
        <div className={styles.logoWrapper}>
          <a href="#" className={styles.logo}/>
        </div>
        <form className={styles.search} action={'#'}>
          <input type="text" autoCorrect="off" autoComplete="off" autoCapitalize="off"
                 value={keyword}
                 placeholder="搜索.."
                 onChange={this.onChangeKeyword}
                 className={styles.input}/>
          <div className={styles.btns}>
            <input type="button" className={classnames(styles.clean)} value="X" onClick={this.onClickClean}/>
            <button type="submit" className={styles.submit} onClick={this.onClickSearch}><Icon type="search"/></button>
          </div>
          <div className={classnames(styles.autocomplete, {
            [styles.show]: hasAutocomplete,
          })}>
            {(autocomplete).map(({ phrase }) =>
              (<div className={styles.autocompleteItem} onClick={that.onClickAutocomplete.bind(that, phrase)}>{phrase}</div>),
            )}
          </div>
        </form>
      </div>
    );
  }

  onClickClean = () => {
    this.setState({
      keyword: '',
    });
  };

  onChangeKeyword = (e) => {
    let { onChangeKeyword } = this.props;
    let keyword = e.target.value;
    this.setState({
      keyword,
    });
    onChangeKeyword(keyword);
  };

  onClickAutocomplete = (keyword) => {
    this.setState({
      keyword,
    });
    console.log('点击', keyword);
    this.openSearchResult(keyword);
  };

  onClickSearch = () => {
    let { keyword } = this.state;
    this.openSearchResult(keyword);
  };

  openSearchResult = (query) => {
    if (!query) {
      return;
    }
    window.open(`https://duckduckgo.com/?q=${query}`, '_blank');
  };
}

export default Index;

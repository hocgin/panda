import React from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import classnames from 'classnames';

class Index extends React.PureComponent {
  state = {
    keyword: '',
  };

  render() {
    let {} = this.props;
    let { keyword } = this.state;
    let hasKeyword = !!`${keyword}`.length;
    return (
      <div className={classnames(styles.component, {
        [styles.inputed]: hasKeyword,
      })}>
        <form className={styles.search} action="">
          <input type="text" autocorrect="off" autocomplete="off" autocapitalize="off"
                 value={keyword}
                 placeholder="搜索.."
                 onChange={this.onChangeKeyword}
                 className={styles.input}/>
          <div className={styles.btns}>
            <input type="button" className={classnames(styles.clean)} value="X" onClick={this.onClickClean}/>
            <button type="submit" className={styles.submit}><Icon type="search"/></button>
          </div>
          <div className={styles.autocomplete}>
            <div>提示内容</div>
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
    let keyword = e.target.value;
    this.setState({
      keyword,
    });
  };
}

export default Index;

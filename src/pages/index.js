import styles from './index.less';
import { AutoComplete, BackTop, Button, Divider, Icon, Input, List, message, Modal } from 'antd';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'dva';
import Formatter from '@/utils/formatter';

const { Option, OptGroup } = AutoComplete;

@connect(({ global, loading }) => {
  return {
    userConfigs: {
      password: '10086',
    },
    workspaces: global.workspaces,
    workspaceTop10: global.workspaceTop10,
    siteTop10: global.siteTop10,
    searchEngines: global.searchEngines,
    isWorkspacesLoading: loading.effects['global/fetchWorkspaces'],
  };
}, dispatch => ({
  $fetchWorkspaces: (args = {}) => dispatch({ type: 'global/fetchWorkspaces', ...args }),
}))
class index extends React.Component {
  state = {
    showLeftPanel: false,
    selectedWorkspaceIndex: 0,
    inputWorkspacePassword: null,
    isSuccessPassword: false,
    useSearchEngine: null,
    keyword: null,
  };

  constructor() {
    super(...arguments);
    this.onInputWorkspacePassword = this.onInputWorkspacePassword.bind(this);
  }

  render() {
    let { showLeftPanel, selectedWorkspaceIndex, isSuccessPassword, keyword } = this.state;
    let { workspaces = [], siteTop10 = [], workspaceTop10 = [], searchEngines = [] } = this.props;
    return (
      <div className={styles.pageWrapper}>
        {/*头部*/}
        <div className={styles.head}>
          <div className={styles.logo}>
            <img src={`http://cdn.hocgin.top/logo.png`} alt="Logo"/>
          </div>
          <div className={styles.searchWrapper}>
            <div className={styles.useSearchEngine}>使用 "{this.getUseSearchEngineName()}" 进行搜索</div>
            <AutoComplete
              allowClear={true}
              dropdownMatchSelectWidth={false}
              size="large"
              autoFocus
              backfill={true}
              style={{ width: '100%' }}
              value={keyword}
              dataSource={searchEngines.map(({ name, query, image, hotKey }, index) => {
                return (
                  <Option key={index} keyword={keyword} className={styles.searchOption}>
                    <div>
                      <span>热键 {hotKey}</span>
                    </div>
                    <div className={styles.searchEngineLogo}><img src={`${image}`} alt={name}/></div>
                  </Option>
                );
              })}
              filterOption={this.filterOption}
              onChange={this.onChangeKeyword}
              onSelect={this.onSelectOption}
              onSearch={this.onSearch}
              placeholder="搜索"
              optionLabelProp="keyword">
              <Input suffix={<Button type="search"
                                     onClick={this.onClickSearch}/>}/>
            </AutoComplete>
          </div>
        </div>
        {/*工作区 - 选择器*/}
        <div className={classnames(styles.selectBar)}>
          <div className={styles.btnGroup}>
            {(workspaces || []).map(({ name, id, type }, idx) => {
              let divider;
              let link = (
                <a key={`a_${idx}`} href={null}
                   onClick={this.onToggleLink.bind(this, idx)}
                   className={classnames(styles.workspace, {
                     [styles.actionWorkspace]: idx === selectedWorkspaceIndex,
                   })}>
                  {name}{type === 1 && <sup><Icon type="lock"/></sup>}
                </a>
              );

              // 如果不是最后一个
              if (idx < workspaces.length - 1) {
                divider = <Divider key={`divider_${idx}`} type="vertical"/>;
              }
              return [
                link,
                divider,
              ];
            })}
          </div>
          <div>
            <Icon type="left"
                  onClick={this.onToggleLeftPanel}
                  className={classnames(styles.rightIcon, {
                    [styles.leftAction]: showLeftPanel,
                  })}/>
            <Divider type="vertical"/>
            <Button shape="circle" icon="setting"/>
            <Divider type="vertical"/>
            <Button shape="circle" icon="bulb" theme="filled"/>
            <Divider type="vertical"/>
            <Button shape="circle" icon={isSuccessPassword ? 'unlock' : 'lock'}
                    onClick={this.onToggleLock.bind(this)}/>
            <img src={'http://cdn.hocgin.top/renice.gif'}
                 alt="来自网络"
                 style={{ height: '22px' }}/>
          </div>
        </div>
        {/*工作区 - 内容*/}
        <div className={styles.content}>
          {/*中间 - 主要*/}
          {
            <div className={styles.mainPanel}>
              {this.isCanRenderWorkspace(selectedWorkspaceIndex) && (workspaces[selectedWorkspaceIndex].themes || []).map(({ name, sites = [] }, index) => {
                if (sites.length === 0) {
                  return null;
                }
                return (<div key={`${index}`} className={styles.panelRow}>
                  <div className={styles.title}>
                    {name}
                  </div>
                  <div className={styles.sites}>
                    {sites.map(({ name, url, image, idx1, idx2 }, index) => (
                      <a key={`${index}`} target="_blank" href={`${url}`}
                         className={styles.siteWrapper}>
                        <div className={styles.site}>
                          <div className={styles.siteHead}>
                            <div className={styles.siteLogo}>
                              <img src={`${image}`} alt={`${name}`}/>
                            </div>
                            <div className={styles.siteTitle}>{name}</div>
                          </div>
                          <div className={styles.siteFooter}>
                            <div className={styles.use}>
                              <Icon type="heart" theme="filled"/> <span>{Formatter.idxString(idx1)}</span>
                            </div>
                            <div className={styles.commend}>
                              <Icon type="tag" theme="filled"/> <span>{Formatter.idxString(idx2)}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>);
              })}
            </div>
          }
          {/*中间 - 右侧*/}
          <div className={classnames(styles.rightPanel, {
            [styles.show]: showLeftPanel,
          })}>
            <div className={styles.box}>
              <Divider className={styles.boxDivider} orientation="left" dashed="true">工作区推荐</Divider>
              <List itemLayout="horizontal"
                    dataSource={workspaceTop10}
                    renderItem={({ title }, index) => (
                      <List.Item className={styles.boxTitle}>
                        <Icon type="right"/> {title}
                      </List.Item>
                    )}
              />
            </div>
            <div className={styles.box}>
              <Divider className={styles.boxDivider} orientation="left" dashed="true">站点推荐</Divider>
              <List itemLayout="horizontal"
                    dataSource={siteTop10}
                    renderItem={({ title }, index) => (
                      <List.Item className={styles.boxTitle}>
                        {index + 1}. {title}
                      </List.Item>
                    )}
              />
            </div>
          </div>
        </div>
        <BackTop/>
      </div>
    );
  }

  onToggleLeftPanel = () => {
    this.setState((pre) => ({
      showLeftPanel: !pre.showLeftPanel,
    }));
  };

  onToggleLink = (idx) => {
    let { workspaces } = this.props;
    let { isSuccessPassword } = this.state;
    let workspace = workspaces[idx];
    console.log('点击  idx', idx, workspace);
    if (workspace.type === 1 && !isSuccessPassword) {
      this.onUnlock(idx);
      return;
    }
    this.setState({
      selectedWorkspaceIndex: idx,
    });
  };

  onInputWorkspacePassword = (e) => {
    this.setState({
      inputWorkspacePassword: e.target.value,
    });
  };

  onToggleLock = () => {
    let { isSuccessPassword } = this.state;
    if (isSuccessPassword) {
      this.onLock();
    } else {
      this.onUnlock();
    }
  };

  /**
   * 解锁
   * @param idx
   */
  onUnlock = (idx) => {
    let { selectedWorkspaceIndex } = this.state;
    idx = idx || selectedWorkspaceIndex;
    console.log('解锁完会跳到', idx);
    Modal.confirm({
      content: (<Input type="password"
                       prefix={<Icon type="unlock"/>}
                       onChange={this.onInputWorkspacePassword}
                       placeholder="请输入密码"/>),
      icon: null,
      title: '请输入密码',
      okText: '确认',
      cancelText: '取消',
      onOk: this.onConfirmWorkspacePassword.bind(this, idx),
    });
  };

  /**
   * 上锁
   */
  onLock = () => {
    this.setState({
      isSuccessPassword: false,
    }, () => {
      message.success('已锁定');
    });
  };

  onConfirmWorkspacePassword = (idx) => {
    let { userConfigs: { password = null } } = this.props;
    let { inputWorkspacePassword } = this.state;
    let isSuccessPassword = (password === null || password === inputWorkspacePassword);

    if (isSuccessPassword) {
      this.setState({
        isSuccessPassword: true,
        inputWorkspacePassword: null,
        selectedWorkspaceIndex: idx,
      }, () => {
        message.success('已解锁');
      });
    } else {
      message.warning('密码输入错误');
      return false;
    }
  };

  isCanRenderWorkspace(idx) {
    let { workspaces } = this.props;
    let { isSuccessPassword } = this.state;
    let workspace = workspaces[idx];
    return (workspace && workspace.type !== 1) || isSuccessPassword;
  }

  onChangeKeyword = (keyword) => {
    let { searchEngines } = this.props;

    // 如果触发选择搜索引擎, ":xxx "
    if (keyword.startsWith(':') && keyword.endsWith(' ')) {
      let result = (searchEngines || []).findIndex(({ hotKey }) => {
        return `${hotKey}` === `${keyword}`.trim();
      });

      console.log('匹配结果', searchEngines, result);
      if (result !== -1) {
        this.setState({
          useSearchEngine: result,
        });
        keyword = '';
      }
    }

    this.setState({
      keyword,
    });
  };

  /**
   * 选择指定搜索引擎
   * @param index
   */
  onSelectOption = (index) => {
    let { keyword } = this.state;
    this.setState({
      keyword,
      useSearchEngine: index,
    }, this.onClickSearch);
    return false;
  };

  /**
   * 点击搜索
   */
  onClickSearch = () => {
    let { keyword, useSearchEngine } = this.state;
    let { searchEngines } = this.props;

    let searchEngine = searchEngines[useSearchEngine || 0];
    let query = searchEngine.query;

    let url = query.replace('{keyword}', keyword || '');
    console.log('jump', url);
    window.location.href = url;
  };

  /**
   * 获取正在使用的搜索引擎名称
   */
  getUseSearchEngineName = () => {
    let { searchEngines = [] } = this.props;
    let { useSearchEngine } = this.state;
    console.log('获取搜索引擎名称', searchEngines, useSearchEngine);

    if (searchEngines.length <= useSearchEngine) {
      return '无法使用';
    }

    let searchEngine = searchEngines[useSearchEngine || 0];
    return searchEngine.name;
  };

  onSearch = (v) => {
    console.log('输入内容', v);
  };

  filterOption = (keyword, { key }) => {
    let { useSearchEngine } = this.state;
    let { searchEngines = [] } = this.props;
    // 如果有选中的搜索引擎
    if (useSearchEngine !== null) {
      // 如果和选中的一样
      if (`${key}` === `${useSearchEngine}`) {
        console.log('如果有选中的搜索引擎', '如果和选中的一样');
        return true;
      }
    }
    // 如果没有选中的搜索引擎
    else {
      // 如果没有匹配符号":"
      if (!`${keyword}`.startsWith(':')) {
        console.log('如果没有选中的搜索引擎', '如果没有匹配符号":"');
        return true;
      }

      // 如果关键词匹配
      if (`${searchEngines[key].hotKey}`.startsWith(keyword)) {
        console.log('如果没有选中的搜索引擎', '如果关键词匹配');
        return true;
      }
    }

    return false;
  };
}

export default index;
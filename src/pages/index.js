import styles from './index.less';
import { AutoComplete, BackTop, Divider, Input, List } from 'antd';
import { Icon } from 'antd';
import { Button } from 'antd';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'dva';
import Formatter from '@/utils/formatter';

@connect(({ global, loading }) => {
  return {
    workspaces: global.workspaces,
    workspaceTop10: global.workspaceTop10,
    siteTop10: global.siteTop10,
    isWorkspacesLoading: loading.effects['global/fetchWorkspaces'],
  };
}, dispatch => ({
  $fetchWorkspaces: (args = {}) => dispatch({ type: 'global/fetchWorkspaces', ...args }),
}))
class index extends React.Component {
  state = {
    showLeftPanel: false,
    selectedWorkspaceIndex: 0,
  };

  render() {
    let { showLeftPanel, selectedWorkspaceIndex } = this.state;
    let { workspaces = [], siteTop10 = [], workspaceTop10 = [] } = this.props;
    return (
      <div className={styles.pageWrapper}>
        {/*头部*/}
        <div className={styles.head}>
          <div className={styles.logo}>
            <img src={`http://cdn.hocgin.top/logo.png`} alt="Logo"/>
          </div>
          <div className={styles.searchWrapper}>
            <AutoComplete
              dropdownMatchSelectWidth={false}
              dropdownStyle={{ width: 300 }}
              size="large"
              style={{ width: '100%' }}
              dataSource={[]}
              placeholder="搜索"
              optionLabelProp="value">
              <Input suffix={<Icon type="search"/>}/>
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
                  {name}{type === 1 ? <sup><Icon type="lock"/></sup> : null}
                </a>
              );
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
            <img src={'http://s3.sinaimg.cn/mw690/002i5ASggy6Ja1oeaHg92&690'}
                 alt="来自网络"
                 style={{ height: '22px' }}/>
          </div>
        </div>
        {/*工作区 - 内容*/}
        <div className={styles.content}>
          {/*中间 - 主要*/}
          {
            workspaces.length - 1 >= selectedWorkspaceIndex && <div className={styles.mainPanel}>
              {(workspaces[selectedWorkspaceIndex].themes || []).map(({ name, sites = [] }, index) => {
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
                        {index + 1}. {title}
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
    this.setState({
      selectedWorkspaceIndex: idx,
    });
  };
}

export default index;
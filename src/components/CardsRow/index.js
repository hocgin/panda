import React from 'react';
import styles from './index.less';
import { Col, Row } from 'antd';
import WebsiteCard from './WebsiteCard';

class Index extends React.PureComponent {
  render() {
    let { title, websites } = this.props;
    return (
      <div className={styles.component}>
        <h2 className={styles.title}>{title} · {websites.length} 个</h2>
        <Row gutter={[{ xs: 5, sm: 25 }, { xs: 10, sm: 15 }]}>
          {(websites).map(({ title = '暂无标题', src = null, desc = '暂无描述', href = '#' }, index) => (
            <Col key={index} xs={24} sm={8}>
              <WebsiteCard title={title}
                           src={src}
                           desc={desc}
                           href={href}/>
            </Col>))}
        </Row>
      </div>
    );
  }
}

export default Index;

import React from 'react';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { settings } from './settings';

import 'antd/dist/antd.css';
import './index.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="campaigns">Campaigns</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          Testing a request:

          <Button onClick={() => getLocations()}>Get Locations</Button>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
}

export default App;

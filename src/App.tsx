import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { settings } from './settings';
import LocationsAdmin from './screens/LocationsAdmin'
import CampaignAdmin from './screens/CampaignAdmin';
import 'antd/dist/antd.css';
import './index.css';
const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Router>



      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="campaigns"><Link to="/CampaignAdmin">Campaigns</Link></Menu.Item>
          <Menu.Item key="locations"><Link to="/LocationsAdmin">Locations</Link></Menu.Item>

        </Menu>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Locations</Breadcrumb.Item>
          <Breadcrumb.Item>Campaigns</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
      <div style={{padding:"20px 0px"}} className="site-layout-content">
        <Layout className="layout">

          <div style={{ margin: "5%"}}>            <Switch>
            <Route path="/LocationsAdmin" exact component={LocationsAdmin} />
            <Route path="/CampaignAdmin" component={CampaignAdmin} />
          </Switch>
          </div>



        </Layout>
      </div>

      <Footer style={{ textAlign: 'center' }}>
        La mama de la mama de la mama de la mama de la mama
      </Footer>

    </Router>



  );
}

export default App;
//TODO: Look for rule that allows React to be in scope
import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import LocationsAdmin from './LocationsAdmin/LocationsAdmin';
import CampaignAdmin from './CampaignsAdmin/CampaignAdmin';
import 'antd/dist/antd.css';
import './index.css';
const { Header, Content, Footer } = Layout;
function App() {
    return (
        <Router>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="home">Home</Menu.Item>
                    <Menu.Item key="campaigns">
                        <Link to="/CampaignsAdmin">Campaigns</Link>
                    </Menu.Item>
                    <Menu.Item key="locations">
                        <Link to="/LocationsAdmin">Locations</Link>
                    </Menu.Item>
                </Menu>
            </Header>

            <Content style={{ padding: '0 50px', margin: '5px 0px', textAlign: 'right' }}>
                <Breadcrumb style={{ margin: '5px 0' }}>
                    <Breadcrumb.Item>Locations</Breadcrumb.Item>
                    <Breadcrumb.Item>Campaigns</Breadcrumb.Item>
                </Breadcrumb>
            </Content>
            <div style={{ padding: '0px 0px 20px 0px' }} className="site-layout-content">
                <Layout className="layout">
                    <div style={{ margin: '5%' }}>
                        <Switch>
                            <Route path="/LocationsAdmin" exact component={LocationsAdmin} />
                            <Route path="/CampaignsAdmin"  component={CampaignAdmin} />
                        </Switch>
                    </div>
                </Layout>
            </div>

            <Footer style={{ textAlign: 'center', backgroundColor: '#173057', color: 'white', fontSize: '1em' }}>
                What do we say to the Footer God? NOT TODAY
            </Footer>
        </Router>
    );
}

export default App;

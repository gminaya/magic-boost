import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import LocationsAdmin from './LocationsAdmin/LocationsAdmin';
import CampaignAdmin from './CampaignsAdmin/CampaignAdmin';
import { CampaignDetails } from './CampaignsAdmin/edit/CampaignDetails';
import { NavBar } from 'commun/NavBar';
import { NavigationBreadcrumbs } from 'commun/NavigationBreadcrumbs';
import { Signup } from 'Auth/Signup';
import { Login } from 'Auth/Login';
import 'antd/dist/antd.css';
import './index.css';
import { Map } from './Maps/Map';
import { Report } from './CampaignsAdmin/report/Report';
import { AuthProvider } from 'contexts/Auth';
import { PrivateRoute } from 'Auth/PrivateRoute';
const { Footer } = Layout;
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <NavigationBreadcrumbs />
        <div style={{ padding: '0px 0px 20px 0px' }} className="site-layout-content">
          <Layout style={{ height: 'auto' }} className="layout">
            <div style={{ margin: '0 2%' }}>
              <Switch>
                <Route path="/LocationsAdmin" exact component={LocationsAdmin} />
                <PrivateRoute exact path="/CampaignsAdmin" component={CampaignAdmin} />
                <Route path="/CampaignsAdmin/edit/:id" component={CampaignDetails} />
                <Route path="/CampaignsAdmin/report/:id" exact component={Report} />
                <Route path="/Auth/Signup" component={Signup} />
                <Route path="/Auth/Login" component={Login} />
                <Route path="/MapTest" component={Map} />
              </Switch>
            </div>
            <Footer
              style={{ textAlign: 'center', backgroundColor: '#173057', color: 'white', fontSize: '1em' }}
            >
              What do we say to the Footer God? NOT TODAY
            </Footer>
          </Layout>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
import { Account } from './Account';
export const NavBar = () => {
  const { Header } = Layout;

  return (
    <Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="home">HOME</Menu.Item>
        <Menu.Item key="campaigns">
          <Link to="/CampaignsAdmin">Campaigns</Link>
        </Menu.Item>
        <Menu.Item key="locations">
          <Link to="/LocationsAdmin">Locations</Link>
        </Menu.Item>
        <Menu.Item key="account">
          <Account />
        </Menu.Item>
      </Menu>
    </Header>
  );
};
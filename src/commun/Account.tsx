import { useHistory } from 'react-router';
import { useAuth } from '../contexts/Auth';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
export const Account = () => {

  const { user, signOut } = useAuth();
  
  const menu = (
    <Menu>
      <Menu.Item onClick={handleSignOut} key="1" icon={<UserOutlined />}>
        {user ? ' Sign Out' : null}
      </Menu.Item>
    </Menu>
  );
  const history = useHistory();

  async function handleSignOut() {
    await signOut();
    history.push('./login');
  }

  return (
    <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
      {
        user?.id
      }
    </Dropdown.Button>
  );
};
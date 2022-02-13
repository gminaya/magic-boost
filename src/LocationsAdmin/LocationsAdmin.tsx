import { useState } from 'react';
import { LocationList } from './LocationList';
import { Divider, Button, Drawer } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import NewLocationForm from './NewLocationForm';
import 'styles/pages/locationsAdmin.scss';

export function LocationsAdmin() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <>
      <Drawer
        className="formDrawer"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisibility}
        key="left"
        width="80%"
        closeIcon={<CloseOutlined />}
      >
        <header className="drawer-title">
          <h1>
            Creating a new location
          </h1>
        </header>
        <NewLocationForm />
      </Drawer>
      <Divider style={{ borderTopColor: 'gray' }} orientation="left">
        <h2>WHERE ALL LOCATIONS LIES</h2>
      </Divider>
      <p className='page-description'>You can view, create or delete locations </p>
      <div>
        <Button type="primary" onClick={toggleDrawer} icon={<PlusOutlined />} size={'small'}>
          ADD NEW LOCATION
        </Button>
      </div>
      <span className='span-text'>Listing all locations</span>
      <LocationList />
    </>
  );
}

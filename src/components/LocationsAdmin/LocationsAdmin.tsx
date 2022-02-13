import { LocationList } from './LocationList';
import { Divider, Button, Drawer } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import NewLocationForm from './NewLocationForm';
import { useToggleDrawer } from 'hooks/useToggleDrawer';
import 'styles/pages/locationsAdmin.scss';

export function LocationsAdmin() {
  const {drawerIsVisible, toggleDrawer} = useToggleDrawer();

  return (
    <>
      <Drawer
        className="formDrawer"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerIsVisible}
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
        <h2>Locations</h2>
      </Divider>
      <div>
        <Button type="primary" onClick={toggleDrawer} icon={<PlusOutlined />} size={'small'}>
          ADD NEW LOCATION
        </Button>
      </div>

      {/* TODO: Spacing! */}
      <LocationList />
    </>
  );
}

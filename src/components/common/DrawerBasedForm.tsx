import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useToggleDrawer } from 'hooks/useToggleDrawer';

interface DrawerBasedFormProps {
  children: React.ReactNode;
  title: string;
}

export const DrawerBasedForm = ({ children, title }: DrawerBasedFormProps) => {
  const { drawerIsVisible, toggleDrawer } = useToggleDrawer();

  return (
    <Drawer
      className="formDrawer"
      placement="left"
      closable={false}
      onClose={toggleDrawer}
      visible={drawerIsVisible}
      key="left"
      width="90%"
      closeIcon={<CloseOutlined />}
    >
      <header className="drawer-title">
        <h1>{title}</h1>
      </header>
      {children}
    </Drawer>
  );
};

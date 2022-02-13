import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export const NavigationBreadcrumbs = () => {
  return (
    <Breadcrumb style={{ margin: '5px 0' }}>
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>Campaigns</Breadcrumb.Item>
    </Breadcrumb>
  );
};
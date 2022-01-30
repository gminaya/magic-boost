/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Popconfirm } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { definitions } from 'db/supabase';
import { useLocations } from 'db/hooks/getLocations';
import { deleteLocation } from 'db/Locations';

import ViewOnGoogleMaps from './ViewOnGoogleMaps';

export const LocationList = () => {
  const { locations, refreshLocations } = useLocations();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Location',
      dataIndex: 'lon',
      key: 'lon',
      render: (_: any, record: definitions['Locations']) => {
        return (
          //TODO: Change to show a map, or link to map
          <ViewOnGoogleMaps lat={record.lon} lon={record.lat} />
        );
      },
    },
    {
      title: 'Remove',
      dataIndex: 'remove',
      key: 'remove',
      render: (_: any, record: definitions['Locations']) => {
        return (
          <Popconfirm
            title="Are you sure to delete this location 🧐 ?"
            onConfirm={async () => {
              await deleteLocation(record.id);
              refreshLocations();
            }}
            okText="Yes"
            cancelText="No"
          >
            {' '}
            <DeleteTwoTone />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Table style={{ margin: 5 }} 
      rowKey="id"
      bordered 
      loading={locations == null} 
      dataSource={locations} 
      columns={columns} />
  );
};

import { Table, Popconfirm, Image} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { definitions } from 'db/SupabaseTypes';
import { useLocations } from 'db/hooks/getLocations';
import { deleteLocation } from 'db/Locations';
import { MapViewerModal } from 'components/Maps/MapViewerModal';

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
      title: 'Default Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (_: unknown, record: definitions['Locations']) => {
        return (
          <Image src={ record.picture_url } height={ 20 } />
        );
      },
    },
    {
      title: 'Location',
      dataIndex: 'lon',
      key: 'lon',
      render: (_: unknown, record: definitions['Locations']) => {
        return (
          <MapViewerModal { ...record } />
        );
      },
    },
    {
      title: 'Remove',
      dataIndex: 'remove',
      key: 'remove',
      render: (_: unknown, record: definitions['Locations']) => {
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
      size='small'
      rowKey="id"
      bordered
      loading={locations == null}
      dataSource={locations}
      columns={columns} />
  );
};
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DeleteOutlined, SearchOutlined, ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Image, message, Popconfirm, Button, Modal, Input, PageHeader } from 'antd';
import { useParams } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useCampaignById } from 'db/hooks/getCampaignDetailsByID';
import { useLocations } from 'db/hooks/getLocations';

import { CampaignLocationInfo } from 'models/CampaignLocationInfo';
import { getSupabaseClient } from 'db/DatabaseClient';
import { DueDateLabel } from 'components/CampaignsAdmin/DueDateLabel';
import { DropPhotoZone } from 'components/CampaignsAdmin/DropPhotoZone';

import { ColumnsType } from 'antd/lib/table';
import { FilterDropdownProps } from 'antd/lib/table/interface';

import 'styles/pages/campaignDetails.scss';
import { definitions } from 'db/SupabaseTypes';


type CampaignParams = {
  id: string;
};

export function CampaignDetails() {
  const { id } = useParams<CampaignParams>();
  const { campaign, refreshCampaign } = useCampaignById(Number(id));
  const { locations } = useLocations();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddLocation = async (newLocation: definitions['Locations']) => {
    campaign?.locationInfo.push({ ...newLocation, campaignPhotoUrl: '' });
    const update = await updateLocationConfig(Number(id), campaign?.locationInfo);
  };

  const showAddLocationModal = () => {
    setIsModalVisible(true);
  };
  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const actions = useMemo(() => {
    const arr = [
      <Button type="primary" onClick={showAddLocationModal} key='ARCHIVE'>ADD LOCATION</Button>,
    ];
    return arr;
  }, [campaign]);
  const addLocationColumns: ColumnsType<definitions['Locations']> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => {
        return <>
          <Input
            autoFocus
            placeholder='Search by adress'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value={selectedKeys as any}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }} />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={() => { confirm(); }} />
          <Button
            type="primary"
            icon={<ClearOutlined />} size="large"
            onClick={clearFilters} />
        </>;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        if (!record.address) {
          return false;
        }

        return record.address.toLowerCase().includes(value.toString().toLowerCase());
      }
    },
    {
      title: 'Add',
      key: 'add',
      render: (_: unknown, record: definitions['Locations']) => {
        return (
          <Button
            type='primary'
            onClick={() => {
              handleAddLocation(record);

            }}
            icon={<PlusOutlined />}
            size={'small'}
          >
            ADD
          </Button>
        );
      },
    },
  ];

  const AddLocationTable = () => {
    return (
      <Table
        size="small"
        style={{ margin: 5 }}
        bordered
        loading={locations == null}
        dataSource={locations}
        columns={addLocationColumns}
        rowKey="id"
      />
    );
  };

  /**
   *uploads selected image to supabase DB
   */
  const uploadImageToSupabase = async (file: File) => {
    const client = getSupabaseClient();
    const filename = `${uuidv4()}.jpg`;
    const { data, error } = await client.storage.from('location-pictures').upload(`public/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/jpg',
    });

    if (error) {
      alert(error?.message);
    }

    return data?.Key;
  };

  /**
   * Retrieves public uploaded image URL from supabase
   */
  const getUploadedImageURL = async (imagePath: string) => {
    const client = getSupabaseClient();
    const { publicURL, error } = client.storage.from('location-pictures').getPublicUrl(imagePath);

    if (error) {
      alert(error?.message);
    }

    if (publicURL) {
      return publicURL;
    }
  };

  /**
   * Modifies location object imageUrl key based on its index with photo public url
   */
  const updatePhotoUrlKey = (locationID: number, imageURL: string) => {
    const locationToUpdate = campaign?.locationInfo.find((loc) => loc.id === locationID);
    if (locationToUpdate) {
      locationToUpdate.campaignPhotoUrl = imageURL;
    }
  };

  /**
   *updates campaing locationConfig on supabase
   */
  const updateLocationConfig = async (campaignID: number, locationCONF: CampaignLocationInfo[] | undefined) => {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('Campaigns')
      .update({ location_config: JSON.stringify(locationCONF) })
      .eq('id', campaignID);

    if (error) {
      alert(error);
    }
    refreshCampaign();
    return data;
  };

  /**
     * Remove location from campaign
     */
  const removeAddedLocation = (locationId: number, locationCONF: CampaignLocationInfo[] | undefined) => {
    const indexToRemove = campaign?.locationInfo.findIndex(loc => loc.id === locationId);

    locationCONF?.splice(Number(indexToRemove), 1);

    updateLocationConfig(Number(id), locationCONF);

  };

  /**
   * Handle for OnChange on ADD button input
   */
  const addBtnOnChange = async (file: File, locationID: number) => {
    const uploadedPath = await uploadImageToSupabase(file);
    if (uploadedPath) {
      const path = uploadedPath.substring(uploadedPath.indexOf('/') + 1);
      const URL = await getUploadedImageURL(path);
      if (URL) {
        updatePhotoUrlKey(locationID, URL);
      }
    }
    const updateLocationConfigResult = await updateLocationConfig(Number(id), campaign?.locationInfo);
    if (updateLocationConfigResult) {
      StatusMessage('Photo uploaded ');
    }
  };

  /**
   * Removes photo file on supabase and updates locationInfo JSON
   */
  const removePhotoOnSupabase = async (locationID: number, imageURL: string) => {
    const client = getSupabaseClient();
    const imagePath = imageURL.substring(imageURL.lastIndexOf('/') + 1);
    const { data, error } = await client.storage.from('location-pictures').remove([`public/${imagePath}`]);

    if (error) {
      throw error;
    }
    if (data) {
      updatePhotoUrlKey(locationID, '');

      const updateResponse = await updateLocationConfig(Number(id), campaign?.locationInfo);
      if (updateResponse) {
        StatusMessage('Photo removed');
      }
    }
  };

  /**
   * locations list table columns config
   */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'adress',
    },
    {
      title: 'ADD / CHANGE Photo',
      dataIndex: 'photoURL',
      key: 'photoURL',
      className: 'photo-input-td',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return (

          <>
            <DndProvider backend={HTML5Backend}>
              <div className='input-continer'>
                <input
                  className='photo-input'
                  id={'photoInput' + record.id}
                  accept='image/jpg'
                  type='file'
                  onChange={(e) => {
                    e.target.files && addBtnOnChange(e.target.files[0], record.id);
                  }
                  } />
                <label htmlFor={'photoInput' + record.id}>
                  <DropPhotoZone onDrop={(e) => { addBtnOnChange(e.files[0], record.id); }} />
                </label>
              </div>
            </DndProvider>
          </>
        );
      },
    },
    {
      title: 'View Photo',
      dataIndex: 'viewPhoto',
      key: 'viewPhoto',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return <Image width={60} src={record.campaignPhotoUrl} />;
      },
    },
    {
      title: 'Remove Photo',
      dataIndex: 'removePhoto',
      key: 'removePhoto',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return (
          <Popconfirm
            title="Are you sure to delete this photo 🧐?"
            onConfirm={async () => {
              removePhotoOnSupabase(record.id, record.campaignPhotoUrl);
            }}
            okText="DELETE"
            cancelText="CANCEL"
          >
            <Button type="primary" icon={<DeleteOutlined />} size={'small'}>
              Remove Photo
            </Button>
          </Popconfirm>
        );
      },
    },
    {
      title: 'Remove location',
      dataIndex: 'removeLocation',
      key: 'removeLocation',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return (
          <Popconfirm
            title="Are you sure to delete this location 🧐?"
            onConfirm={async () => {
              removeAddedLocation(record.id, campaign?.locationInfo);
            }}
            okText="DELETE"
            cancelText="CANCEL"
          >
            <Button type="primary" icon={<DeleteOutlined />} size={'small'}>
              Remove Location
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <PageHeader
      className='page-header'
      ghost={false}
      onBack={() => window.history.back()}
      title={campaign?.name}
      subTitle={<DueDateLabel date={campaign?.due_date} />}
      extra={actions}
    >
      <div>
        <Modal visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel} >
          <AddLocationTable />
        </Modal>
        <Table
          size="small"
          style={{ margin: 5 }}
          bordered
          loading={campaign == null}
          dataSource={campaign?.locationInfo}
          columns={columns}
          rowKey="id"
        />
      </div>
    </PageHeader>
  );
}
const StatusMessage = (msj: string) => {
  message.success(msj);
};
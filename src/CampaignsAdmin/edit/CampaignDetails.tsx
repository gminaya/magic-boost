import { v4 as uuidv4 } from 'uuid';
import { DeleteOutlined } from '@ant-design/icons';
import { Table, Divider, Image, message, Popconfirm, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useCampaignById } from 'db/hooks/getCampaignDetailsByID';

import { CampaignLocationInfo } from 'models/CampaignLocationInfo';
import { supabase as supabaseClient } from 'db/helper';
import { DueDateLabel } from 'CampaignsAdmin/DueDateLabel';
import { DropPhotoZone } from 'CampaignsAdmin/DropPhotoZone';

import 'styles/pages/campaignDetails.scss';

interface CampaignDetails {
  locationList: JSON;
}

type CampaignParams = {
  id: string;
};

export function CampaignDetails() {
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));


  /**
   *uploads selected image to supabase DB
   */
  const uploadImageToSupabase = async (file: File) => {
    const filename = `${uuidv4()}.jpg`;
    const { data, error } = await supabaseClient.storage.from('location-pictures').upload(`public/${filename}`, file, {
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
    const { publicURL, error } = supabaseClient.storage.from('location-pictures').getPublicUrl(imagePath);

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
      locationToUpdate.photoUrl = imageURL;
    }
  };

  /**
   *updates campaing locationConfig on supabase
   */
  const updateLocationConfig = async (campaignID: number, locationCONF: CampaignLocationInfo[] | undefined) => {
    const { data, error } = await supabaseClient
      .from('Campaigns')
      .update({ location_config: JSON.stringify(locationCONF) })
      .eq('id', campaignID);

    if (error) {
      alert(error);
    }
    return data;
  };

  /**
   * Handle for OnChange on ADD button input
   */
  const addBtnOnChange = async (file: File, locationID: number) => {
    const uploadedPath = await uploadImageToSupabase(file);
    if (uploadedPath) {
      const path = uploadedPath.substr(uploadedPath.indexOf('/') + 1);
      const URL = await getUploadedImageURL(path);
      if (URL) {
        updatePhotoUrlKey(locationID, URL);
      }
    }
    const updateLocationConfigResult = await updateLocationConfig(Number(id), campaign?.locationInfo);
    if (updateLocationConfigResult) {
      photoStatusMessage('Photo uploaded ');
    }
  };

  /**
   * Removes photo file on supabase and updates locationInfo JSON
   */
  const removePhotoOnSupabase = async (locationID: number, imageURL: string) => {
    const imagePath = imageURL.substr(imageURL.lastIndexOf('/') + 1);
    const { data, error } = await supabaseClient.storage.from('location-pictures').remove([`public/${imagePath}`]);

    if (error) {
      throw error;
    }
    if (data) {
      updatePhotoUrlKey(locationID, '');

      const updateResponse = await updateLocationConfig(Number(id), campaign?.locationInfo);
      if (updateResponse) {
        photoStatusMessage('Photo removed');
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
      className:'photo-input-td',
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
        return <Image width={60} src={record.photoUrl} />;
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return (
          <Popconfirm
            title="Are you sure to delete this photo 🧐?"
            onConfirm={async () => {
              removePhotoOnSupabase(record.id, record.photoUrl);
            }}
            okText="DELETE"
            cancelText="CANCEL"
          >
            <Button type="primary" icon={<DeleteOutlined />} size={'small'}>
              Remove
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Divider orientation={'left'}>
        <span>You are seeing the campaign locations info of:</span>
        <h1> {campaign?.name} </h1>
      </Divider>
      <span>
        The status of this report is <DueDateLabel date={campaign?.dueDate} />
      </span>
      <Table
        size="small"
        style={{ margin: 5 }}
        bordered
        loading={campaign == null}
        dataSource={campaign?.locationInfo}
        columns={columns}
        rowKey="id"
      />

    </>
  );
}
const photoStatusMessage = (msj: string) => {
  message.success(msj);
};
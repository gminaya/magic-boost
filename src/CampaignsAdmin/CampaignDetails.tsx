import React, { useMemo } from 'react';
import { useCampaignById } from '../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { Table, Divider, Tag, Button } from 'antd';

interface CampaignDetails {
  locationList: JSON;
}

type CampaignParams = {
  id: string;
};

export function CampaignDetails() {
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));

  const columns = useMemo(() => {
    return [
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
        title: 'Photo',
        dataIndex: 'photoURL',
        key: 'photoURL',
        render: (_: unknown, record: CampaignLocationInfo) => {
          return (
            <Button type="primary" onClick={() => {alert(record.name);}} size={'small'}>
              ADD
            </Button>
          );
        },
      },
    ];
  }, []);

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

//TODO: Move to its own file?
interface DateLabelProps {
  date?: string;
}

const DueDateLabel = ({ date }: DateLabelProps) => {
  const today = useMemo(() => new Date(), []);

  if (!date) {
    return <Tag color="geekblue">UNKNOW</Tag>;
  }

  const formatedDueDate = new Date(date);
  return today < formatedDueDate ? <Tag color="green">ON TIME</Tag> : <Tag color="volcano">OVERDUE</Tag>;
};

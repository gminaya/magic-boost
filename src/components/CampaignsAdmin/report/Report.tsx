import  { useState, useEffect, useMemo } from 'react';
import { PageHeader, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { useCampaignById } from 'db/hooks/getCampaignDetailsByID';
import { DueDateLabel } from 'components/CampaignsAdmin/DueDateLabel';
import { LocationCard } from './LocationCard';
import { CampaignLocationInfo } from 'models/CampaignLocationInfo';
import { PrintToPdf } from './pdf/PrintToPdf';
import 'styles/pages/report.scss';

export const Report = () => {
  type CampaignParams = {
    id: string;
  };
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));
  const [locationList, setLocationList] = useState<CampaignLocationInfo[]>([]);
  const locationCardSize = 400;
  useEffect(() => {
    if (campaign?.locationInfo) {
      setLocationList(campaign.locationInfo);
    }
  }, [campaign]);

  const actions = useMemo(() => {
    const arr = [
      <Button key='ARCHIVE'>ARCHIVE</Button>,
      <Button key='SHARE'>SHARE</Button>,
    ];
    if (campaign) {
      arr.push(<PrintToPdf key='PRINT' campaign={campaign} />);
    }

    return arr;
  }, [campaign]);

  return (
    <PageHeader
      className='page-header'
      ghost={false}
      onBack={() => window.history.back()}
      title={campaign?.name}
      subTitle={<DueDateLabel date={campaign?.due_date} />}
      extra={actions}
    >
      <div className='cards-container'>
        {locationList.map((location) => (
          <LocationCard {...location} cardSize={locationCardSize} key={location.id} />
        ))}
      </div>

    </PageHeader>
  );
};
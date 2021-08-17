import { Table } from 'antd';
import { getLocations } from '../db/Locations';
import { useEffect, useState } from 'react';
import { definitions } from '../db/supabase';

type LocationsResult = Array<definitions['Locations']>;

export const LocationList = () => {
    const [locations, setLocations] = useState<LocationsResult>();
    
    // same as ComponentDidMount
    useEffect(() =>{
        const triggerGetLocations = async () => {
            const results = await getLocations();
            if (results == null) {
                return;
            }
            setLocations(results);
        };
        triggerGetLocations();
    }, []);

    const columns = [
        {
            title: 'Llave',
            dataIndex: 'id',
            key: 'id',
        },
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
                    <span>{record.lat},{record.lon}</span>
                )
            }
        }
    ];


    return (
        
        
        <Table bordered 
            loading={locations == null}
            dataSource={locations} 
            columns={columns} 
        />
      
    )

}
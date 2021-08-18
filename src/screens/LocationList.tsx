import { Table, Button, Popconfirm, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { getLocations } from '../db/Locations';
import { useCallback, useEffect, useState } from 'react';
import { definitions } from '../db/supabase';
import { deleteLocation } from '../db/Locations';
import ViewOnGoogleMaps from './ViewOnGoogleMaps'

type LocationsResult = Array<definitions['Locations']>;


export const LocationList = () => {
    const [locations, setLocations] = useState<LocationsResult>();

    const triggerGetLocations = useCallback(async () => {
        const results = await getLocations();
        if (results == null) {
            return;
        }
        setLocations(results);
    }, [getLocations, setLocations]);

    useEffect(() => {
        triggerGetLocations();
    }, []);

    const columns = [
        // 
        //     title: 'Llave',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
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
                    //<span>{record.lat},{record.lon}</span>
                )
            }
        },
        {
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',
            render: (_: any, record: definitions['Locations']) => {
                return (
                    <Popconfirm
                        title="Are you sure to delete this location 🧐 ?"
                        onConfirm={() => {
                            deleteLocation(record.id);
                            triggerGetLocations();
                        }}
                        okText="Yes"
                        cancelText="No"
                    > <DeleteTwoTone />

                    </Popconfirm>
                )
            }
        }
    ];


    return (


        <Table style={{ margin: 5 }} bordered
            loading={locations == null}
            dataSource={locations}
            columns={columns}
        />

    )

}
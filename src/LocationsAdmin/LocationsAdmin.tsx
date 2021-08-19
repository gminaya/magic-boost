import React from 'react';
import { LocationList } from './LocationList';
import NewLocationModal from './NewLocationModal';
import { Divider } from 'antd';

function LocationsAdmin() {
    return (
        <>
            <Divider style={{ borderTopColor: 'gray' }} orientation="left">
                <h2 style={{ marginBottom: 0 }}>WHERE ALL LOCATIONS LIES</h2>
            </Divider>

            <p style={{ textAlign: 'right' }}>You can view, create or delete locations </p>

            <div style={{ margin: '10px 10px 20px 10px' }}>
                <NewLocationModal />
            </div>

            <p style={{ margin: '10px 0px 0px 20px' }}>Listing all locations</p>

            <LocationList />
        </>
    );
}

export default LocationsAdmin;

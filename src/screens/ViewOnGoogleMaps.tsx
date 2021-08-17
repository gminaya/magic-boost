import React, { useState } from "react";
import { Button } from 'antd';
import { RocketTwoTone } from '@ant-design/icons';

function ViewOnGoogleMaps(props:any) {
    const [latitude, setLatitude] = useState(props.lat);
    const [longitude, setLongitude] = useState(props.lon);
    const mapLink = `https://www.google.com/maps/search/${longitude},${latitude}?sa=X&ved=2ahUKEwiq8ZOgxLjyAhVVHzQIHYfTBaIQ8gF6BAgCEAE`;
    return (
        <a target="_blank" href={mapLink}>
            <Button
                    
                    style={{border:'none'}}
                    icon={<RocketTwoTone />}
                    size={'large'} ></Button>
            </a>
    )
}

export default ViewOnGoogleMaps;

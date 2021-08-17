import React from "react";
import { LocationList } from "./LocationList";
import NewLocationModal from "./NewLocationModal"; 

function LocationsAdmin() {
    return(
        <>
        <NewLocationModal />
        
        <LocationList />
        </>

    )
}

export default LocationsAdmin;



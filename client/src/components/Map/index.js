import React, { useEffect, useState } from 'react';
import mapPlaceholder from '../../assets/map-placeholder.gif'
import { useStoreContext } from '../../utils/GlobalState';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from './Marker';
import Popup from './Popup';
import GoogleMapReact from 'google-map-react'


export default function Map(){
    const [state, dispatch] = useStoreContext();
    const [center, setCenter] = useState({lat: 32.7767, lng:-97.010 });
    const [zoom, setZoom] = useState(10);
    const [popupInfo, setPopupInfo] = useState();
    const [activeMarker, setActiveMarker] = useState(null);
    

 
   
    // consider this for auto bounding the maps window
    //  const handleOnLoad = (map) => {
    //     const bounds = new google.maps.LatLngBounds();
    //     markers.forEach(({ position }) => bounds.extend(position));
    //     map.fitBounds(bounds);
    //   };
   
   
    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };
     // onChildClick callback can take two arguments: key and childProps
  
    console.log(state.properties);
    return (
      // Important! Always set the container height explicitly
      <div className='flex h-contain w-contain-xl items-center rounded shadow-lg bg-purple-100 pl-5'>
      <div style={{ height: '550px', width: '800px', border: '3px solid #562266', }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDyfKCmxQxrQqrFnDgMSmj6xxhLnIkbuh8" }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
       

      
      >
          {state.properties.map((property) => (
                <Marker
                    key={property._id}
                    lat={property.lat}
                    lng={property.lng}
                    name={property.address}
                    color="blue"
                    onClick={() => setPopupInfo(property)}
                / >
            ))}
           
           
               
       
      </GoogleMapReact>
    </div>
    </div>
    );
  }
  
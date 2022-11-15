import React, { useEffect, useState } from 'react';
import mapPlaceholder from '../../assets/map-placeholder.gif'
import { useStoreContext } from '../../utils/GlobalState';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from './Marker';
import Popup from './Popup';
import GoogleMapReact from 'google-map-react';



export default function PropertyMap(props){
    

    const [state, dispatch] = useStoreContext();
   // const [center, setCenter] = useState({lat: 32.7767, lng:-97.010 });
    const [zoom, setZoom] = useState(12);
        

    const property = props.property;
    let mylat = props.lat;
    let mylng = props.lng;

    console.log('individual map property: ', property);
    console.log(props.property.lat, props.property.lng)
    const getMapOptions = async (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          center:{lat: mylat, lng: mylng},
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };

      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '550px', width: '800px', border: '3px solid #0022FF' }}>
          { mylat && mylng ?  <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDyfKCmxQxrQqrFnDgMSmj6xxhLnIkbuh8" }}
                center={{lat: property.lat, lng: property.lng}}
                defaultZoom={zoom}
                options={getMapOptions}
            >
                <Marker
                key={property._id}
                lat={property.lat}
                lng={property.lng}
                name={property.address}
                color="blue"
                / >   
            </GoogleMapReact>
            : <div>Loading...</div> }
        </div>
      )
}


 
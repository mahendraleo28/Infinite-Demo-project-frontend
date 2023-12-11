import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Hamburger from "../Hamburger/Hamburger";
import "./map.css";

const MapContainer = (props) => {
  const [city, setCity] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (city.trim() !== '') {
      const { google } = props;
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: city }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          const { geometry } = results[0];

          if (geometry && geometry.location) {
            const { lat, lng } = geometry.location;
            console.log(`Latitude: ${lat()}, Longitude: ${lng()}`);

            if (marker) {
              marker.setMap(null);
            }

            const newPosition = { lat: lat(), lng: lng() };
            setSelectedPlace({ name: city });
            setMarker(new google.maps.Marker({ position: newPosition, map }));
            map.panTo(newPosition);
          }
        } else {
          // Handle error or no results found
          console.log('Error occurred or no results found');
        }
      });
    }
  }, [city, marker, map, props]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };







  

  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  return (
    <div>
      <Hamburger/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <input className='input-for-maps-tag' type="text" placeholder="Enter city" onChange={handleInputChange} value={city} />
      <br/>
      <br/>
      <Map
        google={props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: 37.774929,
          lng: -122.419416,
        }}
        onReady={(mapProps, map) => setMap(map)}
      >
        {marker && <Marker name={selectedPlace && selectedPlace.name} position={marker.position} />}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey:'',
})(MapContainer);
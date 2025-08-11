import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const SimpleMap = () => {
  // Define your latitude and longitude here
  const latitude = 51.505;  // Example latitude
  const longitude = -0.09;  // Example longitude

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup.<br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default SimpleMap;

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function SimpleMap() {
  const [center, setCenter] = useState([51.505, -0.09]); // Default center: London
  const [zoom, setZoom] = useState(13); // Initial zoom level

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Marker_blue.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" mb={2}>React Leaflet with Material UI</Typography>
      
      <MapContainer center={center} zoom={zoom} style={{ width: '80%', height: '70%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={customIcon}>
          <Popup>
            <Typography variant="body1">You are here!</Typography>
          </Popup>
        </Marker>
      </MapContainer>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        startIcon={<LocationOn />}
        onClick={() => setCenter([51.505, -0.09])} // Set to default location on click
      >
        Reset Location
      </Button>
    </Box>
  );
}

export default SimpleMap;

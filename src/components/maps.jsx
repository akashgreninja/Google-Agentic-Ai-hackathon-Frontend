// Maps.jsx
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Directions } from './directions';
import { useApi } from '../helpers/api';
import { Tooltip } from 'antd';
import iconMap from '../constants/maps.json';
import { InfoCircleFilled } from '@ant-design/icons';

export const Maps = () => {
  const { data, callApi } = useApi();

  const [events, setEvents] = useState([
    {
      category: 'flood',
      summary: 'Heavy flooding reported near Silk Board Junction.',
      severity: 'high',
      status: 'active',
      image: 'https://example.com/flood.jpg',
      location: { lat: 12.9172, lng: 77.6232 },
    },
    {
      category: 'fire',
      summary: 'Fire near Koramangala 5th Block. Emergency services on site.',
      severity: 'high',
      status: 'active',
      image: 'https://example.com/fire.jpg',
      location: { lat: 12.9352, lng: 77.6142 },
    },
    {
      category: 'protest',
      summary: 'Public protest near Town Hall. Expect diversions.',
      severity: 'medium',
      status: 'ongoing',
      image: 'https://example.com/protest.jpg',
      location: { lat: 12.9611, lng: 77.5836 },
    },
    {
      category: 'accident',
      summary: 'Vehicle collision near MG Road. Traffic is heavy.',
      severity: 'medium',
      status: 'active',
      image: 'https://example.com/accident.jpg',
      location: { lat: 12.974, lng: 77.6122 },
    },
    {
      category: 'maintenance',
      summary: 'Ongoing road repair work at HSR Layout.',
      severity: 'low',
      status: 'in-progress',
      image: 'https://example.com/maintenance.jpg',
      location: { lat: 12.9121, lng: 77.6446 },
    },
    {
      category: 'concert',
      summary: 'Live music concert at Indiranagar Club.',
      severity: 'low',
      status: 'scheduled',
      image: 'https://example.com/concert.jpg',
      location: { lat: 12.9719, lng: 77.6412 },
    },
  ]);

  const [from, setFrom] = useState({ lat: 12.9352, lng: 77.6142 }); // Fire location
  const [to, setTo] = useState({ lat: 12.9611, lng: 77.5836 }); // Protest location

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('User location:', lat, lng);
        callApi({
          url: `data/get_relevant_incidents?lat=${lat}&lng=${lng}&radius_km=100&user_id=alice@example.com`,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '30rem', margin: '0 auto' }}>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 12.92619, lng: 77.57069 }}
          defaultZoom={12}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={'4abad0676e69254277cf9136'}
          onClick={(e) => {
            const lat = e.detail.latLng.lat;
            const lng = e.detail.latLng.lng;
            console.log('User clicked at:', lat, lng);
          }}
        >
          {events.map((event, index) => (
            <AdvancedMarker key={index} position={event.location}>
              <Tooltip
                title={
                  <span>
                    <InfoCircleFilled style={{ color: 'blue', marginRight: 8 }} />
                    {event.category} ({event.severity}):
                    <br />
                    {event.summary}
                  </span>
                }
              >
                <img
                  src={iconMap[event.category]}
                  alt={event.category}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid black',
                    background: 'white',
                    boxShadow: '0px 0px 6px 6px #ab80ff9e',
                  }}
                />
              </Tooltip>
            </AdvancedMarker>
          ))}

          {/* Render the route between from and to */}
          <Directions from={from} to={to} />
        </Map>
      </div>
    </APIProvider>
  );
};

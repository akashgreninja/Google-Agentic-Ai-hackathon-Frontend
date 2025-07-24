import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Directions } from './directions';
import { useApi } from '../helpers/api';
import { Tooltip } from 'antd';
import iconMap from '../constants/maps.json';
import { InfoCircleFilled } from '@ant-design/icons';

// 12.926199038743462 77.57069938158335
export const Maps = () => {
  const { data, callApi } = useApi();
  const [events, setEvents] = useState([
    {
      category: 'flood',
      summary: 'Heavy flooding reported near Silk Board Junction.',
      severity: 'high',
      status: 'active',
      image: 'https://example.com/flood.jpg',
      location: 'Bangalore',
      location: { lat: 12.9172, lng: 77.6232 },
    },
    {
      category: 'fire',
      summary: 'Fire near Koramangala 5th Block. Emergency services on site.',
      severity: 'high',
      status: 'active',
      image: 'https://example.com/fire.jpg',
      location: 'Bangalore',
      location: { lat: 12.9352, lng: 77.6142 },
    },
    {
      category: 'protest',
      summary: 'Public protest near Town Hall. Expect diversions.',
      severity: 'medium',
      status: 'ongoing',
      image: 'https://example.com/protest.jpg',
      location: 'Bangalore',
      location: { lat: 12.9611, lng: 77.5836 },
    },
    {
      category: 'accident',
      summary: 'Vehicle collision near MG Road. Traffic is heavy.',
      severity: 'medium',
      status: 'active',
      image: 'https://example.com/accident.jpg',
      location: 'Bangalore',
      location: { lat: 12.974, lng: 77.6122 },
    },
    {
      category: 'maintenance',
      summary: 'Ongoing road repair work at HSR Layout.',
      severity: 'low',
      status: 'in-progress',
      image: 'https://example.com/maintenance.jpg',
      location: 'Bangalore',
      location: { lat: 12.9121, lng: 77.6446 },
    },
    {
      category: 'concert',
      summary: 'Live music concert at Indiranagar Club.',
      severity: 'low',
      status: 'scheduled',
      image: 'https://example.com/concert.jpg',
      location: 'Bangalore',
      location: { lat: 12.9719, lng: 77.6412 },
    },
  ]);
  // {
  //     category: 'fire',
  //     "summary":'Fire near Koramangala 5th Block. Emergency services on site.',
  //     severity: 'high',
  //     status: 'active',
  //     image: 'https://example.com/fire.jpg',
  //     location: 'Bangalore',
  //     location: { lat: 12.9352, lng: 77.6142 },
  //   },
  // {
  //       "id": "mPP4BuHdxjL7IB6bJJ6t",
  //       "location": { "lng": 77.6446, "lat": 12.9121 },
  //       "area": "Basavanagudi",
  //       "zipcode": "560004",
  //       "category": "Flood",
  //       "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/80/US_Navy_050102-N-9593M-040_A_village_near_the_coast_of_Sumatra_lays_in_ruin_after_the_Tsunami_that_struck_South_East_Asia.jpg",
  //       "timestamp": "2025-07-21T14:48:14.906869+00:00",
  //       "mood": 0,
  //       "geo": { "latitude": 12.9121, "longitude": 77.6446 },
  //       "severity": "High",
  //       "summary": "Widespread destruction and severe inundation of a residential area, with numerous homes either destroyed or submerged and significant debris scattered throughout the landscape. This appears to be the aftermath of a major natural disaster.",
  //       "distance": 0.0
  //     }
  const getSuggestions = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log('User location:', lat, lng);
      callApi({
        url: `data/agentic_predictive_layer?lat=${lat}&lng=${lng}&radius_km=100&user_id=alice@example.com`,
      });
    });
  };

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
      <div
        style={{
          height: '30rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 12.92619, lng: 77.57069 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          onClick={(e) => {
            const lat = e.detail.latLng.lat;
            const lng = e.detail.latLng.lng;
            console.log('User clicked at:', lat, lng);
            // Add to state if you want to display it
          }}
          mapId={'4abad0676e69254277cf9136'}
        >
          {events.map((event, index) => (
            <AdvancedMarker key={index} position={event.location}>
              <Tooltip
                title={
                  <span>
                    <InfoCircleFilled style={{ color: 'blue', marginRight: 8 }} />
                    {event.category} {'(' + event.severity + '):'}
                    <br />
                    {event.summary}
                  </span>
                }
                style={{ color: 'black', fontWeight: 'bold' }}
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
          {/* <Directions /> */}
        </Map>
      </div>
    </APIProvider>
  );
};

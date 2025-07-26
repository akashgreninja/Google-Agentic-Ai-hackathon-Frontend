// Maps.jsx
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { Directions } from './directions';
import { Tooltip } from 'antd';
import iconMap from '../constants/maps';
import { InfoCircleFilled } from '@ant-design/icons';

// const PlaceAutocomplete = ({ onPlaceSelect }) => {
//   const handlePlaceSelect = useCallback(
//     (event) => {
//       const place = event.detail;
//       onPlaceSelect(place);
//     },
//     [onPlaceSelect]
//   );

//   return (
//     <div className="autocomplete-container">
//       <PlaceAutocompleteElement
//         inputAttributes={{
//           placeholder: 'Search a location...',
//           className: 'your-custom-input-class', // optional
//         }}
//         options={{
//           fields: ['geometry', 'name', 'formatted_address'],
//         }}
//         onPlaceChanged={handlePlaceSelect}
//       />
//     </div>
//   );
// };

export const Maps = ({ data, locations }) => {
  const getIconComp = (cat) => {
    const Icon = iconMap[cat] || iconMap['default'];
    return (
      <Icon
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '2px solid black',
          background: 'white',
          boxShadow: '0px 0px 6px 6px #ab80ff9e',
        }}
      />
    );
  };
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
          {data?.incidents?.map((event, index) => (
            <AdvancedMarker key={index} position={event.location}>
              <Tooltip
                title={
                  <span>
                    <InfoCircleFilled style={{ color: 'blue', marginRight: 8 }} />
                    {event.category} ({event.severity}):
                    <br />
                    {event.title}
                  </span>
                }
              >
                {getIconComp(event.category?.toLowerCase())}
              </Tooltip>
            </AdvancedMarker>
          ))}
          <Directions from={locations?.from} to={locations?.to} />
        </Map>
      </div>
    </APIProvider>
  );
};

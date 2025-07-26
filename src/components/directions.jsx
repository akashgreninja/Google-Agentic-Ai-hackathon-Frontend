import React, { useEffect, useState } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useApi } from '../helpers/api';

export const Directions = ({ from, to }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  const { data, callApi } = useApi();
  const getSuggestions = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log('User location:', lat, lng);
      callApi({
        url: `data/agentic_predictive_route?lat=${lat}&lng=${lng}&radius_km=100&user_id=alice@example.com`,
      });
    });
  };

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    if (!from || !to) return;
    const request = {
      origin: { lat: from.lat, lng: from.lng },
      destination: { lat: to.lat, lng: to.lng },
      travelMode: routesLibrary.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === routesLibrary.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  }, [directionsService, directionsRenderer, from, to]);

  return null; // Directions are rendered on the map, no need to return anything
};

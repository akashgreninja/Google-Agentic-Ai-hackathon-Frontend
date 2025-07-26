import React, { useEffect, useState } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useApi } from '../helpers/api';

export const Directions = ({ from, to, setRoutesEvents }) => {
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
        url: `data/get_incidents_by_route?source_lat=${from.lat}&source_lng=${from.lng}&dest_lat=${to.lat}&dest_lng=${to.lng}`,
      });
    });
  };

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);
  useEffect(() => {
    if (data) {
      setRoutesEvents(data);
    }
  }, [data]);
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    if (!from || !to) {
      console.log({ from, to });
      // directionsRenderer.setMap(null);
      return;
    }
    getSuggestions();
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
  }, [directionsService, directionsRenderer, JSON.stringify({ from, to })]);

  return null; // Directions are rendered on the map, no need to return anything
};

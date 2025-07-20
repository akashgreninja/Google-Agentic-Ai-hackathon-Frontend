import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useApi } from "../helpers/api";

export const Directions = () => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  const { data, callApi } = useApi();
  const getSuggestions = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("User location:", lat, lng);
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
    const request = {
      origin: { lat: 12.92619, lng: 77.57069 },
      destination: { lat: 12.9716, lng: 77.5946 },
      travelMode: routesLibrary.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === routesLibrary.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [directionsService, directionsRenderer]);

  return null; // Directions are rendered on the map, no need to return anything
};

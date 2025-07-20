import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Directions } from "./directions";
import { useApi } from "../helpers/api";

const iconMap = {
  flood: "https://www.iconpacks.net/icons/2/free-sea-icon-1847-thumb.png",
};
// 12.926199038743462 77.57069938158335
export const Maps = () => {
  const { data, callApi } = useApi();
  const [events, setEvents] = useState([
    {
      type: "flood",
      description: "Flood in Bangalore",
      // date: "2023-10-01",
      severity: "high",
      status: "active",
      image: "https://example.com/flood.jpg",
      location: "Bangalore",
      coordinates: { lat: 12.926199038743462, lng: 77.57069938158335 },
    },
  ]);

  const getSuggestions = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("User location:", lat, lng);
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
        console.log("User location:", lat, lng);
        callApi({
          url: `data/get_relevant_incidents?lat=${lat}&lng=${lng}&radius_km=100&user_id=alice@example.com`,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 12.92619, lng: 77.57069 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={(e) => {
          const lat = e.detail.latLng.lat;
          const lng = e.detail.latLng.lng;
          console.log("User clicked at:", lat, lng);
          // Add to state if you want to display it
        }}
        mapId={"4abad0676e69254277cf9136"}
      >
        {events.map((event, index) => (
          <AdvancedMarker key={index} position={event.coordinates}>
            <div style={{ color: "black", fontWeight: "bold" }}>
              <img
                src={iconMap[event.type]}
                alt={event.type}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "2px solid black",
                  background: "white",
                }}
              />
            </div>
          </AdvancedMarker>
        ))}
        {/* <Directions /> */}
      </Map>
    </APIProvider>
  );
};
